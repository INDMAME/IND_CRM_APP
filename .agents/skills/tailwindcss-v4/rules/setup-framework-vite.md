---
title: "Vite Integration"
impact: "CRITICAL"
impactDescription: "Significantly faster builds (2-5x) with dedicated Vite plugin vs PostCSS."
tags: ["setup", "vite", "framework", "integration"]
---

## Vite Integration

v4 has a dedicated Vite plugin that's faster than PostCSS. Use `@tailwindcss/vite` instead of `postcss.config.js`.

**Incorrect (v3 PostCSS approach):**

```js
// postcss.config.js - SLOWER in v4
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

**Correct (v4 Vite plugin):**

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

```css
/* src/index.css */
@import 'tailwindcss';
```

**If you must use PostCSS:**

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}  // NEW package name
  }
}
```

**Key differences:**
- `@tailwindcss/vite` - Fastest, uses Lightning CSS
- `@tailwindcss/postcss` - For non-Vite builds
- No `autoprefixer` needed - v4 handles prefixes

**Trade-offs / When NOT to use:**

- **PostCSS plugins:** If your project relies heavily on other PostCSS plugins that need to run *before* Tailwind, you might need the PostCSS integration instead of the Vite plugin.
- **Complex build chains:** Some complex monorepo setups might behave more predictably with the standard PostCSS integration initially.

Reference: [Installation - Vite](https://tailwindcss.com/docs/installation/vite)
