---
title: "Theme Inline Modifier"
impact: "MEDIUM"
impactDescription: "Preserves CSS variables for JS usage or third-party libraries."
tags: ["theme", "inline", "css-variables"]
---

## Theme Inline Modifier

Use `@theme inline` to preserve CSS variables in output alongside utilities.

**Standard @theme:**

```css
@theme {
  --font-sans: "Inter", sans-serif;
}
```

Variables used for utility generation but NOT emitted as CSS variables.

**With inline modifier:**

```css
@theme inline {
  --font-sans: "SF Pro Text", system-ui, sans-serif;
  --color-primary: #0066cc;
}
```

Variables ARE emitted as CSS custom properties AND used for utilities.

**Output difference:**

```css
/* @theme (no inline) - only utilities generated */
.font-sans { font-family: Inter, sans-serif; }

/* @theme inline - variables preserved */
:root {
  --font-sans: SF Pro Text, system-ui, sans-serif;
  --color-primary: #0066cc;
}
.font-sans { font-family: var(--font-sans); }
```

**When to use inline:**

- Shadcn/Radix design systems that reference CSS vars
- Dynamic theming with JavaScript
- Sharing variables between Tailwind and custom CSS

**Combining with :root:**

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

:root {
  --background: #ffffff;
  --foreground: #1d1d1f;
}

.dark {
  --background: #000000;
  --foreground: #f5f5f7;
}
```

**Trade-offs / When NOT to use:**

- **Bundle size:** Emitting variables adds to CSS size. Only use `inline` if you actually need to access the variables via `var(--...)` in other contexts or JS.
- **Default behavior:** By default, use standard `@theme` to keep the output CSS minimal.

Reference: [Theme Configuration](https://tailwindcss.com/docs/theme)
