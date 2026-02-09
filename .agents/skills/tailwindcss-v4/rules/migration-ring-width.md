---
title: "Ring Requires Explicit Width"
impact: "CRITICAL"
impactDescription: "Visual regression risk: default ring is invisible (0px) in v4."
tags: ["migration", "v3-to-v4", "ring", "focus"]
---

## Ring Requires Explicit Width

v4 changed `ring` to require an explicit width. The default `ring` utility no longer applies a visible ring.

**Incorrect (v3 mental model):**

```html
<button class="focus:ring">Focusable button</button>
<!-- In v4, this produces a ring with width 0 - invisible -->
```

**Correct (v4 explicit width):**

```html
<button class="focus:ring-3">Focusable button</button>
<!-- Produces a 3px ring, similar to v3's default "ring" -->
```

**Available widths:** `ring-0`, `ring-1`, `ring-2`, `ring-3`, `ring-4`, `ring-8`

**Trade-offs / When NOT to use:**

- **Custom focus styles:** If you are implementing custom focus styles (e.g. `outline`), you don't need `ring` at all.
- **Visual clutter:** Avoid adding rings to every interactive element indiscriminately; rely on `:focus-visible` to only show rings when navigating via keyboard.

Reference: [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
