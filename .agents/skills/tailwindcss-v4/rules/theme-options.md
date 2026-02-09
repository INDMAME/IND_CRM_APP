---
title: "@theme Configuration Flags"
impact: "MEDIUM"
impactDescription: "Fine-grained control over theme application and CSS variable generation."
tags: ["directive", "theme", "configuration"]
---

## @theme Flags

The `@theme` directive supports several flags to control its behavior.

### `default`
Merges the provided theme values with the default Tailwind theme. This is the standard way to extend the theme.

```css
@theme default {
  --color-brand: #3b82f6;
}
```

### `inline`
Inlines the theme values directly into the CSS output, rather than relying on CSS variables where possible.

```css
@theme inline {
  --font-family-sans: "Inter", sans-serif;
}
```

### `static`
Prevents the theme values from being emitted as CSS variables in the output. Useful for values only needed at build time.

```css
@theme static {
  --breakpoint-3xl: 1920px;
}
```

### `reference`
Treats the theme block as a reference only. Values are available for use in utilities but are not emitted as CSS variables. Often used when importing a theme file to use its values without duplicating the variable definitions.

```css
@import "my-theme.css" theme(reference);
```

Or within the block:
```css
@theme reference {
  /* ... */
}
```

### Clearing the Namespace
To clear an existing namespace (e.g., to remove all default colors), set the namespace to `initial`:

```css
@theme {
  --color-*: initial;
  --color-brand: #3b82f6; /* Only this color remains */
}
```

**Trade-offs / When NOT to use:**

- **Over-engineering:** Don't use `static` or `reference` unless you have a specific reason (like multiple theme files or preventing variable duplication). The default behavior is usually correct.
- **Clearing defaults:** Be careful with `--color-*: initial`. It removes ALL default colors, meaning `bg-white`, `text-black`, etc., will stop working unless you redefine them.

Reference: [Theme Configuration](https://tailwindcss.com/docs/theme)
