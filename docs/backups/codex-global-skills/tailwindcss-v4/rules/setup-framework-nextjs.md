---
title: "Next.js App Router Integration"
impact: "CRITICAL"
impactDescription: "Eliminates JS config overhead, enables zero-runtime CSS with Next.js."
tags: ["setup", "nextjs", "framework", "integration"]
---

## Next.js App Router Integration

v4 works with Next.js via PostCSS or the experimental `@next/tailwind` integration.

**Setup (PostCSS - recommended):**

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

```css
/* app/globals.css */
@import 'tailwindcss';

@source '../components/**/*.tsx';
@source '../app/**/*.tsx';
```

```tsx
// app/layout.tsx
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Incorrect (v3 config reference):**

```js
// tailwind.config.js - NOT the v4 way
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
}
```

**Correct (v4 CSS source detection):**

```css
/* In globals.css */
@import 'tailwindcss';

/* Explicit source paths if auto-detection misses files */
@source '../components/**/*.tsx';
```

**Turbopack compatibility:**

```bash
# Works with Turbopack
next dev --turbo
```

**Trade-offs / When NOT to use:**

- **Legacy Pages Router:** While v4 works, existing complex v3 setups in Pages Router might require significant refactoring.
- **Turbopack:** Ensure you're on a recent Next.js version as v4 + Turbopack support is continuously improving.

Reference: [Installation - Next.js](https://tailwindcss.com/docs/installation/nextjs)
