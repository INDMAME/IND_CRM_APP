---
title: "New Tailwind v4 Variants"
impact: "HIGH"
impactDescription: "Eliminates need for 3rd-party plugins (container queries, starting styles)."
tags: ["variants", "new-features", "v4"]
---

## New v4 Variants

Tailwind v4 includes several new variants for targeting specific states and media features.

### Container Queries
Directly supported without plugins.
- `@min-[width]:` / `@max-[width]:` - Apply styles based on container width.
- `@-[width]:` - Shorthand for `@min-[width]:`.

```html
<div class="@container">
  <div class="@min-[400px]:flex @max-[600px]:hidden">...</div>
</div>
```

### Starting Style
Target the starting style of an element (for entry transitions).
- `starting:` - Maps to `@starting-style`.

```html
<div class="opacity-0 starting:opacity-100 transition-opacity">...</div>
```

### Details Element
Target the content of a `<details>` element.
- `details-content:` - Maps to `::details-content` pseudo-element.

```html
<details>
  <summary>...</summary>
  <div class="details-content:p-4">...</div>
</details>
```

### Media Query Variants
- `inverted-colors:` - `@media (inverted-colors: inverted)`
- `noscript:` - `@media (scripting: none)`
- `print:` - `@media print`
- `forced-colors:` - `@media (forced-colors: active)`

### Pointer Variants
- `pointer-fine:` - `@media (pointer: fine)`
- `pointer-coarse:` - `@media (pointer: coarse)`
- `pointer-none:` - `@media (pointer: none)`
- `any-pointer-fine:` - `@media (any-pointer: fine)`
- `any-pointer-coarse:` - `@media (any-pointer: coarse)`
- `any-pointer-none:` - `@media (any-pointer: none)`

### Other New Variants
- `in-range:` / `out-of-range:`
- `read-only:`
- `user-valid:` / `user-invalid:`

**Trade-offs / When NOT to use:**

- **Browser support:** Some new variants (like `starting-style` or `details-content`) depend on newer browser features. Check "Can I Use" if supporting older Safari/Firefox versions is critical.
- **Polyfills:** Unlike utility classes that compile to simple CSS, some pseudo-elements/variants might not have easy polyfills if the browser lacks support.

Reference: [Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states)
