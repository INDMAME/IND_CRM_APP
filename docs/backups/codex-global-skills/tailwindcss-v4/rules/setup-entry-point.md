---
title: "CSS Entry Point"
impact: "CRITICAL"
impactDescription: "Standardizes import; replaces multiple directives with single entry point."
tags: ["setup", "v3-to-v4", "import", "directives"]
---

## CSS Entry Point

v4 uses `@import 'tailwindcss'` as the single entry point. The v3 `@tailwind` directives cause errors.

**Incorrect (v3 directives - will error in v4):**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Correct (v4 single import):**

```css
@import 'tailwindcss';
```

**With options:**

```css
/* Set source scanning base */
@import 'tailwindcss' source('../src');

/* Add prefix */
@import 'tailwindcss' prefix(tw);

/* Disable auto-detection */
@import 'tailwindcss' source(none);
```

**Trade-offs / When NOT to use:**

- **Existing v3 projects not ready to migrate:** Only use `@import "tailwindcss"` if you have fully upgraded to v4, including the PostCSS plugin.
- **Complex v3 configurations:** Some highly customized v3 setups might need careful migration of config before switching the entry point.

Reference: [Functions and Directives](https://tailwindcss.com/docs/functions-and-directives)
