/**
 * Creates a throttled function that only invokes the provided function at most once per
 * every `wait` milliseconds.
 *
 * @param func The function to throttle
 * @param wait The number of milliseconds to throttle invocations to
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastCall = 0;
  let lastResult: ReturnType<T>;
  let lastArgs: Parameters<T> | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function throttled(
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    const now = Date.now();

    // If called within wait period
    if (lastCall && now < lastCall + wait) {
      // Store the latest arguments
      lastArgs = args;

      // Schedule only if not already scheduled
      if (!timeout) {
        timeout = setTimeout(() => {
          lastCall = Date.now();
          if (lastArgs) {
            lastResult = func.apply(this, lastArgs);
            lastArgs = null;
          }
          timeout = null;
        }, wait - (now - lastCall));
      }

      return lastResult;
    }

    // Clear any pending execution
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    // Execute immediately
    lastCall = now;
    lastArgs = null;
    lastResult = func.apply(this, args);
    return lastResult;
  };
}
