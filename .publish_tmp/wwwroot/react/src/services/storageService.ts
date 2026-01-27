export const readSession = <T>(key: string, fallback: T): T => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const writeSession = <T>(key: string, value: T): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
};

export const removeSession = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore storage errors
  }
};

export const readLocal = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const writeLocal = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
};

export const removeLocal = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore storage errors
  }
};
