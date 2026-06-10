const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T | null> {
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data as T;
      }
    }
  } catch {}

  try {
    const data = await fetcher();
    if (data) {
      sessionStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    }
    return data;
  } catch {
    return null;
  }
}