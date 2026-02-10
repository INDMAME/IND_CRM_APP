# Component Contracts (IND_CRM_APP)

## Purpose
- Single source for reusable UI component rules.
- Focus on readOnly/edit color handling, dumb-component contracts, and React island wrappers.

## Read-only color contract (high priority)
- Label color: #00296be0 (always).
- Value color: edit = #00296be0, read = #64748b.
- Do not use opacity on read-only wrappers.
- Apply colors inside the component, not only via global CSS.
- Redundant enforcement is required: apply both a `readOnly` prop and inline style on value text when needed.

## Shared page wrapper contracts (React)
### VisitasPageProviders
- File: `Web/wwwroot/react/src/components/commons/VisitasPageProviders.tsx`
- Purpose: default provider wrapper for Visitas island pages.
- Contract:
  - `I18nProvider` and `AuthProvider` are composed once at page-entry level.
  - Page entries (`CreatePage`, `DetailPage`) should wrap their form root with this component.
  - Do not duplicate provider trees inside form-level components.

### AppErrorBoundary
- File: `Web/wwwroot/react/src/components/commons/AppErrorBoundary.tsx`
- Purpose: isolate React island render failures and show localized fallback.
- Props:
  - `fallbackMessage: string` (required, localized with `indT`)
  - `children: React.ReactNode` (required)
- Contract:
  - Wrap top-level form/page container, not each field.
  - Keep fallback simple and readable.
  - Log details in `componentDidCatch` for diagnostics.

## Shared button components (React)
### FilterButton
- File: `Web/wwwroot/react/src/components/commons/FilterButton.tsx`
- Purpose: dumb filter button with standardized styling.
- Styling: `.ind-filter-btn` and `.ind-filter-btn--active` with per-page CSS variables.
- Props:
  - `label: string` (required)
  - `active?: boolean`
  - `disabled?: boolean`
  - `onClick?: () => void`
  - `className?: string`
  - `ariaLabel?: string`
  - `type?: "button" | "submit" | "reset"`

### ActionButton
- File: `Web/wwwroot/react/src/components/commons/ActionButton.tsx`
- Purpose: dumb action button with standardized styling.
- Styling: `.ind-action-btn` with per-page CSS variables.
- Props:
  - `label: string` (required)
  - `disabled?: boolean`
  - `onClick?: () => void`
  - `className?: string`
  - `ariaLabel?: string`
  - `type?: "button" | "submit" | "reset"`

### CompactPagination
- File: `Web/wwwroot/react/src/components/commons/CompactPagination.tsx`
- Purpose: reusable compact paginator for timeline/list pages.
- Contract:
  - `labels` input must come from i18n keys (`first`, `prev`, `next`, `last`).
  - Page logic stays in page hook/container; component only emits page changes.

## Shared narrative field contract (React)
### VisitNarrativeFields
- File: `Web/wwwroot/react/src/components/visitas/VisitNarrativeFields.tsx`
- Purpose: reusable presentational block for description/comments/background/conclusions sections.
- Contract:
  - Receives labels, values, classes, and pointer bindings via props.
  - Must stay dumb and avoid API calls or page navigation logic.
  - Tap/hold handlers are injected from page hooks or page containers.

## Template: input-like component (React)
```tsx
type InputLikeProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
};

// Input-like component with explicit readOnly colors.
export function InputLike({ label, value, onChange, readOnly = false, disabled = false }: InputLikeProps) {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";

  return (
    <div className="space-y-2">
      <label className="form-label font-semibold" style={{ color: "#00296be0" }}>
        {label}
      </label>
      <input
        className="form-control"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        style={{ color: valueColor }}
      />
    </div>
  );
}
```

## Template: select-like component (React)
```tsx
type SelectLikeProps = {
  label: string;
  value: string;
  readOnly?: boolean;
  disabled?: boolean;
};

// Select-like component with explicit readOnly colors.
export function SelectLike({ label, value, readOnly = false, disabled = false }: SelectLikeProps) {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";

  return (
    <div className="space-y-2">
      <label className="form-label font-semibold" style={{ color: "#00296be0" }}>
        {label}
      </label>
      <div className="form-control" style={{ color: valueColor }}>
        {value}
      </div>
    </div>
  );
}
```

## Template: date picker label/value (React)
```tsx
type DatePickerProps = {
  label: string;
  value: string;
  readOnly?: boolean;
  disabled?: boolean;
};

// Date picker label/value with explicit readOnly colors.
export function DatePickerLike({ label, value, readOnly = false, disabled = false }: DatePickerProps) {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";

  return (
    <div className="space-y-2">
      <label
        className="form-label font-semibold"
        style={{ color: "#00296be0", fontSize: "14px", fontWeight: 500, letterSpacing: "0", textTransform: "none" }}
      >
        {label}
      </label>
      <div className="form-control">
        <span style={{ color: valueColor, fontWeight: 400 }}>{value}</span>
      </div>
    </div>
  );
}
```

## Last updated
- 2026-02-10
