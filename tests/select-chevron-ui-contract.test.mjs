import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const reactRoot = path.join(repoRoot, "Web", "wwwroot", "react", "src");

const sourcePaths = {
  chevrons: path.join(reactRoot, "components", "commons", "chevrons.tsx"),
  remoteSearch: path.join(reactRoot, "components", "commons", "RemoteSearchCombobox.tsx"),
  select: path.join(reactRoot, "components", "commons", "SelectCombobox.tsx"),
  datePicker: path.join(reactRoot, "components", "commons", "SingleDatePicker.tsx"),
  clientSearch: path.join(reactRoot, "components", "visitas", "ClientSearchCombobox.tsx"),
  contacts: path.join(reactRoot, "components", "visitas", "ContactsCombobox.tsx"),
  ticketTime: path.join(reactRoot, "pages", "gastos", "components", "ExpenseTicketTimeInput.tsx"),
  createLines: path.join(reactRoot, "pages", "gastos", "components", "ExpenseSheetCreateLinesEditor.tsx"),
  helpFooter: path.join(reactRoot, "pages", "system", "homeHelp", "HomeHelpMessageFooter.tsx"),
  inputCss: path.join(repoRoot, "Web", "wwwroot", "css", "input.css"),
};

const sourceEntries = await Promise.all(
  Object.entries(sourcePaths).map(async ([name, filePath]) => [name, await readFile(filePath, "utf8")])
);
const sources = Object.fromEntries(sourceEntries);

const customFieldSources = [
  sources.remoteSearch,
  sources.select,
  sources.datePicker,
  sources.clientSearch,
  sources.contacts,
  sources.ticketTime,
];

test("select-like fields use one fixed large chevron", () => {
  assert.match(sources.chevrons, /SELECT_CHEVRON_ICON_CLASS_NAME = "h-5 w-5 shrink-0"/u);
  assert.match(sources.chevrons, /export const SelectChevron/u);

  customFieldSources.forEach((source) => {
    assert.match(source, /<SelectChevron\s+open=/u);
    assert.doesNotMatch(source, /ChevronDownSvg|ChevronUpSvg/u);
    assert.doesNotMatch(source, /<SelectChevron[^>]*className=/u);
  });
});

test("select-like field actions share one right-aligned geometry", () => {
  assert.match(
    sources.chevrons,
    /SELECT_FIELD_ACTIONS_CLASS_NAME = "absolute inset-y-0 right-0 flex items-center gap-1 pr-2"/u
  );
  assert.match(
    sources.chevrons,
    /SELECT_FIELD_ACTION_BUTTON_CLASS_NAME = "flex items-center justify-center p-1\.5"/u
  );

  customFieldSources.forEach((source) => {
    assert.ok((source.match(/SELECT_FIELD_ACTIONS_CLASS_NAME/gu) || []).length >= 2);
    assert.ok((source.match(/SELECT_FIELD_ACTION_BUTTON_CLASS_NAME/gu) || []).length >= 2);
  });

  assert.match(sources.remoteSearch, /showSearchIcon \|\| loading \? "pr-20" : "pr-10"/u);
});

test("native selects use the same 20px aligned chevron", () => {
  assert.match(sources.inputCss, /@utility ind-native-select-chevron/u);
  assert.match(sources.inputCss, /background-position: right 14px center;/u);
  assert.match(sources.inputCss, /background-size: 20px 20px;/u);
  assert.match(sources.inputCss, /padding-right: 2\.5rem !important;/u);
  assert.equal((sources.createLines.match(/<select[^>]*className="[^"]*ind-native-select-chevron[^"]*"/gu) || []).length, 2);
  assert.doesNotMatch(sources.createLines, /<input[^>]*ind-native-select-chevron/gu);
  assert.match(sources.helpFooter, /<select[^>]*className="[^"]*ind-native-select-chevron[^"]*"/u);
});
