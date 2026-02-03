# Component Contracts (IND_CRM_APP)

## Purpose
- Single source for reusable UI component rules.
- Focus on readOnly/edit color handling for input-like components.

## Read-only color contract (high priority)
- Label color: #00296be0 (always).
- Value color: edit = #00296be0, read = #64748b.
- Do not use opacity on read-only wrappers.
- Apply colors inside the component, not only via global CSS.
- Redundant enforcement is required: apply both a readOnly prop and inline style on value text.

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
- 2026-02-03
