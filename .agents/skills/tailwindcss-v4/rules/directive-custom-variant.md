---
title: "@custom-variant Directive"
impact: "HIGH"
impactDescription: "Enables powerful custom selectors without complex plugin configuration."
tags: ["directive", "custom-variant", "customization"]
---

## @custom-variant

Use `@custom-variant` to define a new variant that can be used like built-in variants (e.g., `hover:`, `focus:`).

### Defining a Custom Variant

You can define a custom variant using a selector or a body block.

#### Using a Selector
Pass the variant name and the selector it represents. Use `&` to represent the element.

```css
@custom-variant pointer-coarse (@media (pointer: coarse));
@custom-variant dark (&:where(.dark, .dark *));
```

Usage:
```html
<div class="pointer-coarse:hidden">...</div>
<div class="dark:bg-slate-900">...</div>
```

#### Using a Body Block with @slot
For more complex variants, use a block and `@slot` to indicate where the utility styles should be inserted.

```css
@custom-variant hocus {
  &:hover,
  &:focus {
    @slot;
  }
}
```

Usage:
```html
<button class="hocus:opacity-100">...</button>
```

### Circular Dependencies
Avoid circular dependencies where variants reference each other in a loop.

**Trade-offs / When NOT to use:**

- **Complexity:** Complex selectors can be hard to debug. Keep custom variants simple.
- **Performance:** Excessive use of complex selectors (like universal selectors `*` or deep nesting) can impact rendering performance.

Reference: [Functions and Directives](https://tailwindcss.com/docs/functions-and-directives)
