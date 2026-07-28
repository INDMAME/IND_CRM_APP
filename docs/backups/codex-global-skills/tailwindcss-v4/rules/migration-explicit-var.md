---
title: "Explicit var() in Arbitrary Values"
impact: "CRITICAL"
impactDescription: "Breaking change: implicit var() injection removed. Classes will fail silently."
tags: ["migration", "v3-to-v4", "arbitrary-values", "css-variables"]
---

## Explicit var() in Arbitrary Values

v4 requires explicit `var()` when using CSS variables in arbitrary values. The v3 implicit injection is removed.

**Incorrect (v3 implicit var):**

```html
<div class="bg-[--my-color]">Colored box</div>
<!-- In v4, this produces NO CSS output - silently fails -->
```

**Correct (v4 explicit var):**

```html
<div class="bg-[var(--my-color)]">Colored box</div>
<!-- Correctly references the CSS variable -->
```

This applies to all arbitrary values that reference CSS variables:

```html
<!-- All incorrect in v4 -->
<div class="w-[--sidebar-width]">
<div class="p-[--spacing-lg]">
<div class="text-[--heading-size]">

<!-- All correct in v4 -->
<div class="w-[var(--sidebar-width)]">
<div class="p-[var(--spacing-lg)]">
<div class="text-[var(--heading-size)]">
```

**Trade-offs / When NOT to use:**

- **Verbosity:** It's more verbose.
- **Theme Variables:** If the variable is defined in your theme (e.g. `--color-primary`), use the utility class `bg-primary` instead of `bg-[var(--color-primary)]`.

Reference: [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
