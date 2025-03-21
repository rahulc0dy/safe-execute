export interface SafeExecutionOptions<T> {
  onSuccess?: (result: T) => void;
  onError?: (error: unknown) => void;
  timeoutMs?: number; // Timeout in milliseconds
}

export async function safeExecute<T>(
  fn: () => Promise<T> | T,
  options?: SafeExecutionOptions<T> & { timeoutMs?: number }
): Promise<{
  data: T | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  error: unknown;
}> {
  let result: T | null = null;
  let isError = false;
  let isSuccess = false;
  let isLoading = true;
  let errorObj: unknown = null;

  const promise = Promise.resolve().then(fn);

  const finalPromise = options?.timeoutMs
    ? Promise.race([
        promise,
        new Promise<T>((_, reject) =>
          setTimeout(
            () => reject(new Error("Operation timed out")),
            options.timeoutMs
          )
        ),
      ])
    : promise;

  try {
    result = await finalPromise;
    isSuccess = true;
    options?.onSuccess?.(result);
  } catch (error) {
    isError = true;
    errorObj = error;
    options?.onError?.(error);
  } finally {
    isLoading = false;
  }

  return { data: result, isError, isSuccess, isLoading, error: errorObj };
}
