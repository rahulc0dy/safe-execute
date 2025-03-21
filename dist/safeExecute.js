/**
 * Wraps a promise in a try/catch block and returns a discriminated union with either the data or an error.
 *
 * @param promise - A promise that resolves to type T.
 * @returns A promise that resolves to a Result object.
 */
export async function safeExecute(promise) {
    try {
        const data = await promise;
        return { data, error: null };
    }
    catch (error) {
        return { data: null, error: error };
    }
}
