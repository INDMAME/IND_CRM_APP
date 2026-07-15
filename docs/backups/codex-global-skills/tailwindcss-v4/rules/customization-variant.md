---
title: "Custom Variants with @variant"
impact: "HIGH"
impactDescription: "Enables complex state targeting directly in CSS without plugins."
tags: ["customization", "variants", "directives"]
---

## Custom Variants with @variant

v4 uses `@variant` to define custom variants directly in CSS.

**Correct (v4 @variant):**

```css
/* Simple variant - combines selectors */
@variant hocus (&:hover, &:focus);

/* Media query variant */
@variant pointer-coarse (@media (pointer: coarse));

/* Supports query */
@variant supports-grid (@supports (display: grid));

/* Dark mode with class strategy */
@variant dark (&:is(.dark, .dark *));
```

**Usage:**

```html
<button class="hocus:bg-blue-600 pointer-coarse:p-4">
  Hover or focus me
</button>
```

**Nested variant with @slot:**

```css
@variant dark {
  &:where([data-theme="dark"], [data-theme="dark"] *) {
    @slot;
  }
}
```

**Trade-offs / When NOT to use:**

- **Readability:** If a custom variant hides too much logic (e.g., `fancy-state:`), it might be unclear to others what triggers it.
- **Arbitrary variants:** For one-off needs, use arbitrary variants like `[.active_&]:` instead of defining a global custom variant.

Reference: [Functions and Directives](https://tailwindcss.com/docs/functions-and-directives)
