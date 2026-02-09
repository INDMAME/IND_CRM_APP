---
title: "Dark Mode Configuration"
impact: "HIGH"
impactDescription: "Default changed to system preference; requires explicit config for class strategy."
tags: ["migration", "dark", "mode", "variants"]
---

## Dark Mode Configuration

v4 defaults to `media` strategy (prefers-color-scheme). For class-based dark mode, use `@variant`.

**v4 default (media query):**

```css
/* Automatic - follows system preference */
@import 'tailwindcss';

/* dark: variants use @media (prefers-color-scheme: dark) */
```

```html
<div class="bg-white dark:bg-gray-900">
  Follows system preference
</div>
```

**Class-based dark mode:**

```css
@import 'tailwindcss';

@variant dark (&:is(.dark, .dark *));
```

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-gray-900">
      Dark when .dark class on html
    </div>
  </body>
</html>
```

**Data attribute strategy:**

```css
@variant dark (&:is([data-theme="dark"], [data-theme="dark"] *));
```

```html
<html data-theme="dark">
  <div class="dark:bg-gray-900">Dark mode active</div>
</html>
```

**Incorrect (v3 config):**

```js
// tailwind.config.js - NOT the v4 way
module.exports = {
  darkMode: 'class',  // Use @variant instead
}
```

**Correct (v4 @variant):**

```css
@variant dark (&:is(.dark, .dark *));
```

**Trade-offs / When NOT to use:**

- **System preference:** If you don't need a toggle button, the default `media` strategy is better (zero config).
- **Complexity:** Manually managing the `.dark` class requires JS code.

Reference: [Dark Mode](https://tailwindcss.com/docs/dark-mode)
