interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries to store
}

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

/**
 * Creates a cached version of a function that stores its results.
 *
 * @param func The function to cache
 * @param options Cache configuration options
 * @returns A cached version of the function
 */
export function cache<T extends (...args: any[]) => any>(
  func: T,
  options: CacheOptions = {}
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, CacheEntry<ReturnType<T>>>();
  const { ttl, maxSize = 1000 } = options;

  return function cached(this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    const now = Date.now();
    const entry = cache.get(key);

    if (entry && (!ttl || now - entry.timestamp < ttl)) {
      return entry.value;
    }

    const result: ReturnType<T> = func.apply(this, args);

    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }

    cache.set(key, { value: result, timestamp: now });
    return result;
  };
}
