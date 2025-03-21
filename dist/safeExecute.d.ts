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
export declare function safeExecute<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>>;
