---
title: Custom Variants
impact: HIGH
impactDescription: Advanced selector logic for dark mode etc
tags: variant, custom-variant, dark-mode
---

## Custom Variants

Use `@custom-variant` for advanced selector logic beyond built-in variants.

**Dark mode with class strategy:**

```css
@custom-variant dark (&:is(.dark *));
```

This creates a `dark:` variant that matches elements inside a `.dark` parent.

**Usage:**

```html
<html class="dark">
  <body class="bg-white dark:bg-black">
    <!-- dark:bg-black applies -->
  </body>
</html>
```

**Multiple selectors:**

```css
@custom-variant hocus (&:hover, &:focus);
@custom-variant group-hocus (:merge(.group):hover &, :merge(.group):focus &);
```

**Print variant:**

```css
@custom-variant print (@media print);
```

**vs @variant:**

```css
/* @variant - simple selector list */
@variant hocus (&:hover, &:focus);

/* @custom-variant - same syntax, preferred for clarity */
@custom-variant hocus (&:hover, &:focus);
```

Both work identically. `@custom-variant` is more explicit about intent.

**Trade-offs / When NOT to use:**

- **Complexity:** Overusing custom variants can make class lists hard to read for new developers.
- **Built-in alternatives:** Check if a built-in variant (like `group-hover` or `peer-checked`) already exists before creating a custom one.

Reference: [Custom Variants](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants)
