import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { pathToFileURL } from "node:url";

const sourceRoot = path.resolve(import.meta.dirname, "../Web/wwwroot/react/src");
const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? files(file) : file.endsWith(".tsx") ? [file] : [];
});

// Finds textual JSX error outlets, excluding component props and the common popup presenter.
export function findInlineErrorOutlets() {
  const results = [];
  for (const file of files(sourceRoot)) {
    if (file.endsWith("/ConfirmModal.tsx") || file.endsWith("\\ConfirmModal.tsx")) continue;
    const text = readFileSync(file, "utf8");
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = node => {
      if (ts.isJsxElement(node)) {
        const tag = node.openingElement.tagName.getText(source);
        const content = node.children.filter(child => !ts.isJsxText(child) || child.text.trim());
        if (["div", "p", "span"].includes(tag) && content.length === 1 && ts.isJsxExpression(content[0]) && content[0].expression) {
          const expression = content[0].expression.getText(source);
          let containsMarkup = false;
          const inspectExpression = child => {
            if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child) || ts.isJsxFragment(child)) containsMarkup = true;
            ts.forEachChild(child, inspectExpression);
          };
          inspectExpression(content[0].expression);
          let namedError = false;
          const inspectNames = child => {
            const isCallee = ts.isCallExpression(child.parent) && child.parent.expression === child;
            if (ts.isIdentifier(child) && !isCallee && /^(?:\w*[Ee]rror\w*|validationMessage|fuelPriceMessage)$/.test(child.text)) namedError = true;
            if (ts.isCallExpression(child) && /^(?:indT|indFormat)$/.test(child.expression.getText(source))) {
              const key = child.arguments[0];
              if (key && ts.isStringLiteral(key) && /Error|Failed|Validation|PermissionDenied/.test(key.text)) namedError = true;
            }
            ts.forEachChild(child, inspectNames);
          };
          inspectNames(content[0].expression);
          const boundaryFallback = file.endsWith("AppErrorBoundary.tsx") && expression.includes("fallbackMessage");
          if (!containsMarkup && (namedError || boundaryFallback)) results.push({ file: path.relative(sourceRoot, file).replaceAll("\\", "/"),
            line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
            expression, start: node.getStart(source), end: node.end });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return results;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const results = findInlineErrorOutlets();
  for (const result of results) console.log(`${result.file}:${result.line} ${result.expression.replace(/\s+/g, " ").slice(0, 180)}`);
  console.log(`Inline textual error outlets: ${results.length}`);
  process.exitCode = results.length ? 1 : 0;
}
