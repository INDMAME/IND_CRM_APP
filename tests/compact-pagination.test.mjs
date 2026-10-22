import assert from "node:assert/strict";
import test from "node:test";
import { build } from "esbuild";
import { chromium } from "@playwright/test";

// Exercise the shared pagination with controlled state and no backend requests.
test("the last visible page reveals the next window without hiding the selected page", async () => {
  const bundle = await build({
    stdin: { contents: `import React, { useState } from 'react';
      import { createRoot } from 'react-dom/client';
      import Pagination from './Web/wwwroot/react/src/components/commons/CompactPagination.tsx';
      const root = createRoot(document.getElementById('root'));
      export function mount(totalPages, initialPage = 1, pageWindow = 6, loading) {
        function Fixture() {
          const [page, setPage] = useState(initialPage);
          return <Pagination totalPages={totalPages} currentPage={page} pageWindow={pageWindow}
            loading={loading} onPageChange={setPage}
            labels={{ first:'First', prev:'Previous', next:'Next', last:'Last' }} />;
        }
        root.render(<Fixture />);
      }`, resolveDir: process.cwd(), loader: "tsx" },
    bundle: true, write: false, format: "iife", globalName: "paginationFixture", jsx: "automatic",
  });
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent('<div id="root"></div>');
    await page.addScriptTag({ content: bundle.outputFiles[0].text });
    const numbers = () => page.locator('#pagination button').evaluateAll(buttons => buttons.map(button => button.textContent.trim()).filter(text => /^\d+$/.test(text)).map(Number));
    const mount = async (total, current = 1, size = 6, loading) => {
      await page.evaluate(args => window.paginationFixture.mount(...args), [total, current, size, loading]);
      if (total > 1) await page.getByRole('button', { name: String(current), exact: true }).waitFor();
    };
    await mount(18);
    assert.deepEqual(await numbers(), [1, 2, 3, 4, 5, 6]);
    await page.getByRole('button', { name: '6', exact: true }).click();
    assert.deepEqual(await numbers(), [6, 7, 8, 9, 10, 11]);
    await page.getByRole('button', { name: '11', exact: true }).click();
    assert.deepEqual(await numbers(), [11, 12, 13, 14, 15, 16]);
    await page.getByRole('button', { name: 'Previous', exact: true }).click();
    assert.deepEqual(await numbers(), [6, 7, 8, 9, 10, 11]);
    await page.getByRole('button', { name: 'First', exact: true }).click();
    assert.deepEqual(await numbers(), [1, 2, 3, 4, 5, 6]);
    await page.getByRole('button', { name: 'Last', exact: true }).click();
    assert.deepEqual(await numbers(), [16, 17, 18]);
    assert.equal(await page.getByRole('button', { name: 'Next', exact: true }).count(), 0);
    await mount(6, 6);
    assert.deepEqual(await numbers(), [1, 2, 3, 4, 5, 6]);
    await mount(7, 6);
    assert.deepEqual(await numbers(), [6, 7]);
    await mount(11, 11);
    assert.deepEqual(await numbers(), [6, 7, 8, 9, 10, 11]);
    await mount(12, 11);
    assert.deepEqual(await numbers(), [11, 12]);
    await mount(4, 4, 1);
    assert.deepEqual(await numbers(), [4]);
    await mount(10, 4, 4);
    assert.deepEqual(await numbers(), [4, 5, 6, 7]);
    await mount(18, 6, 6, true);
    assert.equal(await page.getByRole('button', { name: '7', exact: true }).isDisabled(), true);
    await mount(3);
    assert.deepEqual(await numbers(), [1, 2, 3]);
  } finally { await browser.close(); }
});
