// safeExecute.ts
/**
 * Safely executes a function (sync or async) and returns an object with the execution result and state.
 *
 * @param fn - The function to execute safely. It can return a value or a promise.
 * @param options - Optional callbacks for success and error handling.
 * @returns {Promise<SafeExecutionResult<T>>} A promise that resolves with the function's result and state flags.
 */
export async function safeExecute(fn, options) {
    let result = null;
    let isError = false;
    let isSuccess = false;
    let isLoading = true;
    try {
        result = await fn();
        isSuccess = true;
        options?.onSuccess?.(result);
    }
    catch (error) {
        isError = true;
        options?.onError?.(error);
    }
    finally {
        isLoading = false;
    }
    return { data: result, isError, isSuccess, isLoading };
}
