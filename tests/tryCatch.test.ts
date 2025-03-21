import { describe, test, expect } from "vitest";
import { tryCatch, Result } from "../src/tryCatch";

describe("tryCatch", () => {
  test("should return a success result when the promise resolves", async () => {
    const promise = Promise.resolve(42);
    const result = await tryCatch(promise);

    // Expect the result to be a success (data is set, error is null)
    expect(result.data).toBe(42);
    expect(result.error).toBeNull();
  });

  test("should return a failure result when the promise rejects with an Error", async () => {
    const errorMessage = "Test error";
    const promise = Promise.reject(new Error(errorMessage));
    const result = await tryCatch(promise);

    // Expect the result to be a failure (data is null and error is an Error with our message)
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect((result.error as Error).message).toBe(errorMessage);
  });

  test("should allow custom error types", async () => {
    type CustomError = { code: number; message: string };
    const customError: CustomError = { code: 404, message: "Not Found" };
    const promise = Promise.reject(customError);
    const result = await tryCatch<number, CustomError>(promise);

    // Expect the result to be a failure with our custom error
    expect(result.data).toBeNull();
    expect(result.error).toEqual(customError);
  });
});
