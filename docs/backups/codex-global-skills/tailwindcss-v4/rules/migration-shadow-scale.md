---
title: "Shadow Scale Shift"
impact: "CRITICAL"
impactDescription: "Visual regression risk: shadows scale shifted down one step (shadow -> shadow-sm)."
tags: ["migration", "v3-to-v4", "shadow", "scale"]
---

## Shadow Scale Shift

v4 shifted the shadow scale down by one step. What was `shadow` in v3 is now `shadow-sm` in v4.

**Incorrect (v3 mental model):**

```html
<div class="shadow">Card with shadow</div>
<!-- In v4, this produces a SMALLER shadow than v3's "shadow" -->
```

**Correct (v4 equivalent):**

```html
<div class="shadow-sm">Card with shadow</div>
<!-- Matches v3's "shadow" visual output -->
```

**Full scale mapping:**

| v3 Class | v4 Equivalent |
|----------|---------------|
| `shadow-sm` | `shadow-xs` |
| `shadow` | `shadow-sm` |
| `shadow-md` | `shadow` |
| `shadow-lg` | `shadow-md` |
| `shadow-xl` | `shadow-lg` |
| `shadow-2xl` | `shadow-xl` |

**Trade-offs / When NOT to use:**

- **New designs:** If designing a new UI from scratch, prefer using the new v4 scale as is (simply use `shadow-md` if you want a medium shadow) rather than strictly mapping to v3. The mapping is only critical for migration.
- **Custom shadows:** If the built-in scale doesn't fit, use arbitrary values `shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]` or define custom theme variables.

Reference: [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
