---
title: "Native Container Queries"
impact: "HIGH"
impactDescription: "No plugin needed; native syntax simpler and more performant."
tags: ["migration", "container", "queries", "responsive"]
---

## Native Container Queries

v4 includes container queries natively. Remove `@tailwindcss/container-queries` plugin.

**Incorrect (v3 with plugin):**

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/container-queries'),  // NOT needed in v4
  ],
}
```

**Correct (v4 native):**

```html
<!-- Define container -->
<div class="@container">
  <!-- Respond to container width -->
  <div class="@lg:grid-cols-2 @md:flex-row">
    Content
  </div>
</div>
```

**Container variants:**

| Variant | Container Width |
|---------|-----------------|
| `@sm:` | 320px (20rem) |
| `@md:` | 448px (28rem) |
| `@lg:` | 512px (32rem) |
| `@xl:` | 576px (36rem) |
| `@2xl:` | 672px (42rem) |

**Named containers:**

```html
<div class="@container/sidebar">
  <div class="@lg/sidebar:hidden">
    Hidden when sidebar is large
  </div>
</div>
```

**Common confusion:**
- `lg:` = viewport breakpoint (screen width)
- `@lg:` = container query (parent width)

```html
<!-- Viewport-based (screen width) -->
<div class="lg:hidden">Hidden on large screens</div>

<!-- Container-based (parent width) -->
<div class="@lg:hidden">Hidden in large containers</div>
```

**Trade-offs / When NOT to use:**

- **Browser support:** Ensure your target browsers support CSS container queries (modern browsers generally do).
- **Layout thrashing:** Overusing container queries in deeply nested structures might have performance implications in very complex apps, though generally negligible.

Reference: [Container Queries](https://tailwindcss.com/docs/container-queries)
