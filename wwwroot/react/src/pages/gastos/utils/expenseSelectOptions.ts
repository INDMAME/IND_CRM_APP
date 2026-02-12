export type ExpenseSelectOption = {
  value: string;
  text: string;
};

type WindowEnumItem = {
  value?: unknown;
  Value?: unknown;
  text?: unknown;
  Text?: unknown;
};

export const normalizeExpenseOptionValue = (value: unknown): string => {
  return String(value ?? "").trim();
};

// Maps mixed-case enum payloads (Value/value + Text/text) into one normalized list.
export const mapWindowEnumOptions = (source: WindowEnumItem[]): ExpenseSelectOption[] => {
  return source
    .map((item) => ({
      value: normalizeExpenseOptionValue(item?.value ?? item?.Value),
      text: normalizeExpenseOptionValue(item?.text ?? item?.Text),
    }))
    .filter((item) => item.value && item.text);
};

// Converts boolean enums to select options with string boolean values.
export const mapBooleanEnumOptions = (source: Array<{ value: boolean; text: string }>): ExpenseSelectOption[] => {
  return source.map((item) => ({
    value: item.value ? "true" : "false",
    text: normalizeExpenseOptionValue(item.text),
  }));
};
