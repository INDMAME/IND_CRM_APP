---
name: ind-dark-html-docs
description: Use when generating shareable HTML documentation, technical-functional proposals, architecture notes, Notion-style exports, inventories, or decision docs for IND projects that should use the dark document style with orange technical identifiers.
---

# IND Dark HTML Docs

## Overview

Use this skill to generate standalone HTML documents for IND projects with the established dark documentation style: dark background, quiet technical layout, blue section accent, and orange inline technical identifiers.

This is intended for shareable proposals, technical-functional designs, architecture notes, endpoint inventories, enum inventories, decision documents, and Notion page exports.

## Output Rules

- Generate an `.html` file, not Markdown, unless the user explicitly asks for another format.
- Prefer `docs/exports/<kebab-case-title>.html`.
- Create `docs/exports` if it does not exist.
- Keep the source of truth clear. If the source is a Notion page and Notion tools are available, fetch the current page before exporting.
- Do not create or recreate companion `.md` files when the user wants HTML/export-only work.
- Use `lang="es"` for Spanish documents and `meta charset="utf-8"`.
- Wrap the document content in a single `<main>`.
- Use semantic headings: one `h1`, then `h2`, `h3`, and `h4` as needed.
- Put variables, API routes, method names, table names, fields, enum values, file paths, and code identifiers in `<code>...</code>`. The CSS renders them orange.
- Use `.callout` for concise decisions, assumptions, or examples.
- Use `.inventory-item` for repeated inventory entries such as enums, endpoints, methods, risks, or phases.
- Include `@media print` from the style block so the HTML can be printed/exported as PDF from the browser.

## Required Style

Use this CSS block unless the user asks for a different visual style.

```html
<style>
  :root {
    color-scheme: dark;
    --text: #e5edf5;
    --muted: #a8b3c2;
    --line: #314154;
    --soft: #182232;
    --panel: #111a27;
    --accent: #58c4ff;
    --tech: #fb923c;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #07111f;
    color: var(--text);
    font-family: "Segoe UI", Arial, sans-serif;
    line-height: 1.55;
  }

  main {
    max-width: 980px;
    margin: 32px auto;
    padding: 48px 56px;
    background: var(--panel);
    border: 1px solid var(--line);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.38);
  }

  h1,
  h2,
  h3,
  h4 {
    color: #f3f7fb;
    line-height: 1.25;
  }

  h1 {
    margin: 0 0 8px;
    font-size: 30px;
    letter-spacing: 0;
  }

  h2 {
    margin: 36px 0 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--line);
    font-size: 22px;
  }

  h3 {
    margin: 28px 0 12px;
    font-size: 18px;
  }

  h4 {
    margin: 22px 0 10px;
    font-size: 15px;
    color: var(--accent);
    text-transform: uppercase;
  }

  p {
    margin: 10px 0;
  }

  ul,
  ol {
    margin: 8px 0 16px 22px;
    padding: 0;
  }

  li {
    margin: 6px 0;
  }

  code {
    padding: 1px 5px;
    border-radius: 4px;
    background: #241a12;
    color: var(--tech);
    font-family: Consolas, "Courier New", monospace;
    font-size: 0.94em;
    font-weight: 600;
  }

  pre {
    overflow: auto;
    margin: 12px 0 20px;
    padding: 16px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #070d18;
    color: #e5edf5;
    font-size: 13px;
    line-height: 1.45;
  }

  pre code {
    padding: 0;
    background: transparent;
    color: var(--tech);
    font-weight: 500;
  }

  .meta {
    margin-bottom: 28px;
    color: var(--muted);
    font-size: 14px;
  }

  .callout {
    margin: 18px 0;
    padding: 14px 16px;
    border-left: 4px solid var(--accent);
    background: #0d2537;
  }

  .inventory-item {
    margin: 18px 0;
    padding: 14px 16px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #0e1724;
  }

  .inventory-item h4 {
    margin-top: 0;
    text-transform: none;
    color: #f3f7fb;
    font-size: 16px;
  }

  @media print {
    body {
      background: #07111f;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    main {
      max-width: none;
      margin: 0;
      padding: 24mm 18mm;
      border: 0;
      box-shadow: none;
    }

    h2,
    h3 {
      break-after: avoid;
    }

    .inventory-item {
      break-inside: avoid;
    }
  }
</style>
```

## HTML Skeleton

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Document title</title>
  <!-- Insert Required Style here -->
</head>
<body>
  <main>
    <h1>Document title</h1>
    <p class="meta">Fuente: source. Exportado: YYYY-MM-DD.</p>

    <h2>Section</h2>
    <p>Use <code>technical identifiers</code> inline.</p>

    <div class="callout">
      <strong>Decision:</strong> short decision text.
    </div>

    <section class="inventory-item">
      <h4>1. <code>InventoryItemName</code></h4>
      <ul>
        <li>Valores conocidos: <code>0 Example</code>.</li>
        <li>Uso: concise usage text.</li>
      </ul>
    </section>
  </main>
</body>
</html>
```

## Review Checklist

- The document opens without a server.
- All technical identifiers are wrapped in `<code>` and appear orange.
- The page uses dark mode and keeps the document centered in `<main>`.
- Repeated blocks use `.inventory-item`, not nested card structures.
- The print stylesheet remains present.
- The output is in `docs/exports` unless the user requested another location.
