export const classNames = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
