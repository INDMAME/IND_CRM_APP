"""Copy rendered TOC page numbers into a new DOCX without changing its authored body."""

import argparse
from collections import Counter
import copy
import hashlib
import io
import json
from pathlib import Path
import re
import shutil
import tempfile
import xml.etree.ElementTree as ET
from xml.parsers import expat
import zipfile


WORD_NAMESPACE = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
W = "{" + WORD_NAMESPACE + "}"
DOCUMENT_PART = "word/document.xml"
ET.register_namespace("w", WORD_NAMESPACE)


def file_hash(path):
    """Return a source or output fingerprint without opening Word."""
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read_package(path):
    """Reject ambiguous or signed packages before preparing a derivative."""
    with zipfile.ZipFile(path) as package:
        names = package.namelist()
        if len(names) != len(set(names)):
            raise ValueError("Duplicate package entries are not supported")
        if any(name.startswith("_xmlsignatures/") for name in names):
            raise ValueError("Signed DOCX files require a separate signing workflow")
        if DOCUMENT_PART not in names:
            raise ValueError("The package has no Word document part")
        parts = {name: package.read(name) for name in names}
        for name, data in parts.items():
            if name.endswith(".xml") or name.endswith(".rels"):
                ET.fromstring(data)
        return parts


def body_child_spans(document_bytes):
    """Locate direct body children by byte offset so the rest of the XML stays exact."""
    parser = expat.ParserCreate(namespace_separator="|")
    stack = []
    spans = []
    starts = []
    body_name = WORD_NAMESPACE + "|body"

    def start_element(name, unused_attributes):
        if stack and stack[-1] == body_name:
            starts.append(parser.CurrentByteIndex)
        stack.append(name)

    def end_element(unused_name):
        if len(stack) >= 2 and stack[-2] == body_name:
            end = parser.CurrentByteIndex
            if document_bytes[end:end + 2] == b"</":
                end = document_bytes.index(b">", end) + 1
            spans.append((starts.pop(), end))
        stack.pop()

    parser.StartElementHandler = start_element
    parser.EndElementHandler = end_element
    parser.Parse(document_bytes, True)
    return spans


def find_original_toc(document_bytes):
    """Accept one generated TOC with separate boundary paragraphs and linked cache rows."""
    root = ET.fromstring(document_bytes)
    body = root.find(W + "body")
    if body is None:
        raise ValueError("The document has no body")
    children = list(body)
    spans = body_child_spans(document_bytes)
    if len(children) != len(spans):
        raise ValueError("Could not match document body byte spans")
    starts = [
        index for index, child in enumerate(children)
        if any(re.search(r"\bTOC\b", instruction.text or "") for instruction in child.iter(W + "instrText"))
    ]
    if len(starts) != 1:
        raise ValueError("Expected exactly one direct-body TOC field")
    first = starts[0]
    if children[first].tag != W + "p" or list(children[first].iter(W + "t")):
        raise ValueError("The TOC start paragraph must contain only its field boundary")
    depth = 0
    last = None
    for index in range(first, len(children)):
        for marker in children[index].iter(W + "fldChar"):
            kind = marker.get(W + "fldCharType")
            if kind == "begin":
                depth += 1
            elif kind == "end":
                depth -= 1
                if depth == 0:
                    last = index
                    break
        if last is not None:
            break
    if last is None or last <= first or list(children[last].iter(W + "t")):
        raise ValueError("The TOC must end in its own field boundary paragraph")
    entries = []
    for index in range(first + 1, last):
        paragraph = children[index]
        links = list(paragraph.iter(W + "hyperlink"))
        if paragraph.tag != W + "p" or len(links) != 1 or list(paragraph.iter(W + "fldChar")):
            raise ValueError("The generated TOC must contain one plain linked entry per paragraph")
        link = links[0]
        anchor = link.get(W + "anchor")
        if not anchor or list(link.iter(W + "tab")):
            raise ValueError("Expected an original linked TOC entry without cached page numbers")
        entries.append({
            "paragraph": paragraph,
            "link": link,
            "anchor": anchor,
            "label": "".join(t.text or "" for t in link.iter(W + "t")),
            "span": spans[index],
        })
    if not entries or len({entry["anchor"] for entry in entries}) != len(entries):
        raise ValueError("TOC anchors must be present and unique")
    return root, entries, (spans[first][0], spans[last][1])


def authored_body_text(root):
    """Compare exact paragraph text while excluding generated field results."""
    paragraphs = []
    depth = 0
    for paragraph in root.iter(W + "p"):
        fragments = []
        for event, node in ET.iterparse(io.BytesIO(ET.tostring(paragraph)), events=("start", "end")):
            if node.tag == W + "fldSimple":
                depth += 1 if event == "start" else -1
            if event != "start":
                continue
            if node.tag == W + "fldChar":
                marker = node.get(W + "fldCharType")
                if marker == "begin":
                    depth += 1
                elif marker == "end":
                    depth = max(0, depth - 1)
            elif node.tag == W + "t" and not depth:
                fragments.append(node.text or "")
        text = "".join(fragments).strip()
        if text:
            paragraphs.append(text)
    return paragraphs


def media_hashes(parts):
    """Compare embedded image bytes even when a renderer renames media parts."""
    return Counter(hashlib.sha256(data).hexdigest() for name, data in parts.items() if name.startswith("word/media/"))


def rendered_toc_pages(refreshed_root, original_anchors):
    """Map renderer bookmarks back to the original bookmarks preserved on each heading."""
    bookmark_targets = {}
    for paragraph in refreshed_root.iter(W + "p"):
        names = [bookmark.get(W + "name") for bookmark in paragraph.iter(W + "bookmarkStart")]
        originals = set(names) & original_anchors
        if not originals:
            continue
        if len(originals) != 1:
            raise ValueError("A refreshed heading contains multiple original TOC anchors")
        original = next(iter(originals))
        for name in names:
            bookmark_targets[name] = original
    parents = {child: parent for parent in refreshed_root.iter() for child in parent}
    instructions = [node for node in refreshed_root.iter(W + "instrText") if re.search(r"\bTOC\b", node.text or "")]
    if len(instructions) != 1:
        raise ValueError("Expected one refreshed TOC")
    container = instructions[0]
    while container.tag != W + "sdtContent":
        container = parents.get(container)
        if container is None:
            raise ValueError("The refreshed TOC must have a content-control container")
    pages = {}
    for link in container.iter(W + "hyperlink"):
        anchor = bookmark_targets.get(link.get(W + "anchor"))
        if not anchor or anchor in pages:
            raise ValueError("A refreshed TOC link has no unique original bookmark")
        label = []
        page = []
        after_tab = False
        for node in link.iter():
            if node.tag == W + "tab":
                after_tab = True
            elif node.tag == W + "t":
                (page if after_tab else label).append(node.text or "")
        page_text = "".join(page).strip()
        if not re.fullmatch(r"[1-9][0-9]*", page_text):
            raise ValueError("The refreshed TOC has no positive numeric page for " + anchor)
        pages[anchor] = {"label": "".join(label), "page": page_text}
    if set(pages) != original_anchors:
        raise ValueError("The original and refreshed TOC entries do not match")
    return pages


def cache_entry_xml(entry, page_number, right_tab_position):
    """Append a page run and leader tab while keeping the original label and hyperlink."""
    paragraph = copy.deepcopy(entry["paragraph"])
    properties = paragraph.find(W + "pPr")
    if properties is None:
        properties = ET.Element(W + "pPr")
        paragraph.insert(0, properties)
    if properties.find(W + "tabs") is not None:
        raise ValueError("The generated cache has custom tab stops; review them before refreshing")
    tabs = ET.Element(W + "tabs")
    ET.SubElement(tabs, W + "tab", {W + "val": "right", W + "pos": str(right_tab_position), W + "leader": "dot"})
    before_tabs = {"pStyle", "keepNext", "keepLines", "pageBreakBefore", "framePr", "widowControl", "numPr", "suppressLineNumbers", "pBdr", "shd"}
    position = 0
    while position < len(properties) and properties[position].tag.removeprefix(W) in before_tabs:
        position += 1
    properties.insert(position, tabs)
    link = next(paragraph.iter(W + "hyperlink"))
    first_run = link.find(W + "r")
    run = ET.SubElement(link, W + "r")
    if first_run is not None and first_run.find(W + "rPr") is not None:
        run.append(copy.deepcopy(first_run.find(W + "rPr")))
    ET.SubElement(run, W + "tab")
    ET.SubElement(run, W + "t").text = page_number
    return ET.tostring(paragraph, encoding="utf-8")


def refresh_cache(source, refreshed, output):
    """Create and validate a new package with changes limited to cached TOC paragraphs."""
    source = source.resolve()
    refreshed = refreshed.resolve()
    output = output.resolve()
    if output in (source, refreshed) or output.exists():
        raise ValueError("Output must be a new path distinct from both input files")
    source_hash = file_hash(source)
    original = read_package(source)
    rendered = read_package(refreshed)
    root, entries, toc_span = find_original_toc(original[DOCUMENT_PART])
    rendered_root = ET.fromstring(rendered[DOCUMENT_PART])
    if authored_body_text(root) != authored_body_text(rendered_root):
        raise ValueError("The refreshed document does not preserve the exact authored body text")
    if media_hashes(original) != media_hashes(rendered):
        raise ValueError("The refreshed document does not preserve the embedded image bytes")
    pages = rendered_toc_pages(rendered_root, {entry["anchor"] for entry in entries})
    section = root.find(".//" + W + "sectPr")
    page_size = section.find(W + "pgSz") if section is not None else None
    margins = section.find(W + "pgMar") if section is not None else None
    if page_size is None or margins is None:
        raise ValueError("Explicit page size and margins are required")
    right_tab = int(page_size.get(W + "w")) - int(margins.get(W + "left")) - int(margins.get(W + "right"))
    modified = original[DOCUMENT_PART]
    for entry in reversed(entries):
        rendered_entry = pages[entry["anchor"]]
        if rendered_entry["label"] != entry["label"]:
            raise ValueError("A rendered TOC label differs from its original: " + entry["anchor"])
        start, end = entry["span"]
        replacement = cache_entry_xml(entry, rendered_entry["page"], right_tab)
        modified = modified[:start] + replacement + modified[end:]
    modified_root = ET.fromstring(modified)
    if authored_body_text(root) != authored_body_text(modified_root):
        raise ValueError("Authored body text changed while patching the cache")
    begin, end = toc_span
    suffix_length = len(original[DOCUMENT_PART]) - end
    if modified[:begin] != original[DOCUMENT_PART][:begin] or (suffix_length and modified[-suffix_length:] != original[DOCUMENT_PART][end:]):
        raise ValueError("Document XML outside the TOC field changed")
    old_fields = [(element.tag, element.text, dict(element.attrib)) for element in root.iter() if element.tag in (W + "fldChar", W + "instrText")]
    new_fields = [(element.tag, element.text, dict(element.attrib)) for element in modified_root.iter() if element.tag in (W + "fldChar", W + "instrText")]
    if old_fields != new_fields:
        raise ValueError("A native field instruction or boundary changed")
    output.parent.mkdir(parents=True, exist_ok=True)
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(prefix=output.stem + ".", suffix=".tmp", dir=output.parent, delete=False) as pending:
            temp_path = Path(pending.name)
        with zipfile.ZipFile(source) as source_zip, zipfile.ZipFile(temp_path, "w") as target_zip:
            for info in source_zip.infolist():
                target_zip.writestr(info, modified if info.filename == DOCUMENT_PART else original[info.filename])
        candidate = read_package(temp_path)
        if set(candidate) != set(original):
            raise ValueError("Package part names changed")
        changed = [name for name in original if original[name] != candidate[name]]
        if changed != [DOCUMENT_PART]:
            raise ValueError("Changes escaped the document TOC cache")
        if file_hash(source) != source_hash:
            raise ValueError("The source changed during the operation")
        with output.open("xb") as final_file, temp_path.open("rb") as candidate_file:
            shutil.copyfileobj(candidate_file, final_file)
    finally:
        if temp_path is not None and temp_path.exists():
            temp_path.unlink()
        if file_hash(source) != source_hash:
            raise ValueError("The source DOCX unexpectedly changed")
    return {
        "source": str(source),
        "refreshedInput": str(refreshed),
        "output": str(output),
        "sourceSha256Before": source_hash,
        "sourceSha256After": file_hash(source),
        "outputSha256": file_hash(output),
        "sourceUnchanged": True,
        "changedParts": [DOCUMENT_PART],
        "documentBytesOutsideTocUnchanged": True,
        "nativeFieldInstructionsAndBoundariesUnchanged": True,
        "authoredBodyTextUnchanged": True,
        "allOtherPackagePartsUnchanged": True,
        "entryCount": len(entries),
        "entries": [{"anchor": entry["anchor"], **pages[entry["anchor"]]} for entry in entries],
        "paginationAuthority": "Cached page numbers from the supplied rendered derivative; not a Microsoft Word pagination claim.",
    }


def main():
    """Expose a stable, new-output-only command for the Word export workflow."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True, type=Path, help="Original generated DOCX with a linked TOC cache.")
    parser.add_argument("--refreshed", required=True, type=Path, help="Temporary renderer DOCX with refreshed TOC page numbers.")
    parser.add_argument("--output", required=True, type=Path, help="New DOCX path; existing files are never overwritten.")
    parser.add_argument("--report", type=Path, help="Optional new JSON validation report path.")
    args = parser.parse_args()
    if args.report is not None and args.report.exists():
        raise ValueError("Report path must also be new")
    result = refresh_cache(args.source, args.refreshed, args.output)
    serialized = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    if args.report is not None:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        with args.report.open("x", encoding="utf-8") as report_file:
            report_file.write(serialized)
    print(json.dumps({key: value for key, value in result.items() if key != "entries"}, ensure_ascii=False))


if __name__ == "__main__":
    main()
