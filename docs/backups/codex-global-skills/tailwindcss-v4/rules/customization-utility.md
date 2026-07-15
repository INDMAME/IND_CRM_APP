---
title: "Custom Utilities with @utility"
impact: "HIGH"
impactDescription: "Standardizes utility creation; eliminates complex @layer utilities syntax."
tags: ["customization", "utilities", "directives"]
---

## Custom Utilities with @utility

v4 uses `@utility` directive to define custom utilities that work with variants. This replaces the v3 `@layer utilities` pattern.

**Incorrect (v3 @layer pattern):**

```css
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

**Correct (v4 @utility directive):**

```css
@utility content-auto {
  content-visibility: auto;
}
```

**With variants - they just work:**

```html
<div class="hover:content-auto md:content-auto">
  <!-- Variants apply automatically -->
</div>
```

**Functional utility with values:**

```css
@utility tab-* {
  tab-size: --value(--tab-size-*, integer);
}

/* Usage: tab-2, tab-4, tab-8 based on --tab-size-* variables */
```

**Trade-offs / When NOT to use:**

- **One-off styles:** For styles used only once, arbitrary values (`[content-visibility:auto]`) or inline styles are often better than polluting the global CSS with a custom utility.
- **Complex components:** If a utility grows into a complex set of styles, consider extracting it into a React/Vue component instead.

Reference: [Functions and Directives](https://tailwindcss.com/docs/functions-and-directives)
