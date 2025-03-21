// Types for the result object with discriminated union
export type Success<T> = {
  data: T;
  error: null;
};

export type Failure<E> = {
  data: null;
  error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Wraps a promise in a try/catch block and returns a discriminated union with either the data or an error.
 *
 * @param promise - A promise that resolves to type T.
 * @returns A promise that resolves to a Result object.
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
