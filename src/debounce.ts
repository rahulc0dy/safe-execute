/**
 * Delays the execution of the provided function until after the specified wait time
 * has elapsed since the last invocation. Useful for limiting the rate at which a
 * function is executed, such as in response to user input or window resizing.
 *
 * @param func - The function to debounce. Must not be an arrow function.
 * @param wait - The number of milliseconds to delay.
 * @returns A debounced version of the provided function.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>): void {
    if (func.prototype === undefined) {
      throw new TypeError(
        "The provided function must not be an arrow function."
      );
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
