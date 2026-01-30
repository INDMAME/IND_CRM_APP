export const bindReadOnlyGuard = (el: HTMLElement | null) => {
  if (!el) return () => {};
  const cancel = (event: Event) => event.preventDefault();
  const events = ["contextmenu", "selectstart", "copy", "cut", "paste"];
  events.forEach((evt) => el.addEventListener(evt, cancel));
  return () => {
    events.forEach((evt) => el.removeEventListener(evt, cancel));
  };
};
