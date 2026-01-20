type Entry = {
  count: number;
  lastHit: number;
};

const store = new Map<string, Entry>();

const WINDOW = 60 * 1000;
const LIMIT = 5;

export function rateLimit(key: string) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, lastHit: now });
    return null;
  }

  if (now - entry.lastHit > WINDOW) {
    store.set(key, { count: 1, lastHit: now });
    return null;
  }

  if (entry.count >= LIMIT) {
    return "Too many requests. Try again later.";
  }

  entry.count += 1;
  return null;
}
