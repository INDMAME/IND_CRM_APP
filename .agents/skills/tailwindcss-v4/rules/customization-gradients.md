---
title: "New Gradient Syntax"
impact: "MEDIUM"
impactDescription: "Cleaner syntax and better color interpolation defaults."
tags: ["gradient", "linear", "radial", "conic"]
---

## New Gradient Syntax

Tailwind v4 introduces cleaner gradient utilities.

**Linear gradients:**

```html
<!-- v4 syntax -->
<div class="bg-linear-to-r from-blue-500 to-purple-500"></div>
<div class="bg-linear-to-b from-foreground to-foreground/70"></div>

<!-- Direction variants -->
bg-linear-to-t    <!-- top -->
bg-linear-to-tr   <!-- top-right -->
bg-linear-to-r    <!-- right -->
bg-linear-to-br   <!-- bottom-right -->
bg-linear-to-b    <!-- bottom -->
bg-linear-to-bl   <!-- bottom-left -->
bg-linear-to-l    <!-- left -->
bg-linear-to-tl   <!-- top-left -->
```

**vs v3 syntax:**

```html
<!-- v3 (still works) -->
<div class="bg-gradient-to-r from-blue-500 to-purple-500"></div>

<!-- v4 preferred -->
<div class="bg-linear-to-r from-blue-500 to-purple-500"></div>
```

**Radial gradients:**

```html
<div class="bg-radial from-white to-transparent"></div>
<div class="bg-radial-[at_top] from-sky-500 to-transparent"></div>
```

**Conic gradients:**

```html
<div class="bg-conic from-red-500 via-yellow-500 to-red-500"></div>
```

**With arbitrary values:**

```html
<div class="bg-linear-[45deg] from-pink-500 to-orange-500"></div>
<div class="bg-radial-[circle_at_top] from-blue-500 to-transparent"></div>
```

**Text gradients:**

```css
.text-gradient {
  @apply bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70;
}
```

**Trade-offs / When NOT to use:**

- **Legacy support:** If you must support very old browsers that don't handle modern gradient syntax well (rare now).
- **Complexity:** Complex multi-stop gradients can be harder to read in utility classes than in CSS.

Reference: [Gradients](https://tailwindcss.com/docs/background-image)
