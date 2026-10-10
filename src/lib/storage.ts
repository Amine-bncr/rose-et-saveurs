const memory = new Map<string, string>();

/** localStorage with an in-memory fallback for blocked or unavailable storage. */
export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

export function writeStorage(key: string, value: string): void {
  memory.set(key, value);
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage is blocked: the in-memory copy above keeps the session working.
  }
}
