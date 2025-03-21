import { describe, test, expect, vi } from "vitest";
import { safeExecute, SafeExecutionOptions } from "../src/safeExecute";

describe("safeExecute", () => {
  test("executes a synchronous function successfully", async () => {
    const syncFn = () => 42;
    const onSuccess = vi.fn();
    const result = await safeExecute(syncFn, { onSuccess });

    expect(result.data).toBe(42);
    expect(result.isSuccess).toBe(true);
    expect(result.isError).toBe(false);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBeNull();
    expect(onSuccess).toHaveBeenCalledWith(42);
  });

  test("executes an asynchronous function successfully", async () => {
    const asyncFn = async () => "Hello, async!";
    const onSuccess = vi.fn();
    const result = await safeExecute(asyncFn, { onSuccess });

    expect(result.data).toBe("Hello, async!");
    expect(result.isSuccess).toBe(true);
    expect(result.isError).toBe(false);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBeNull();
    expect(onSuccess).toHaveBeenCalledWith("Hello, async!");
  });

  test("handles errors in synchronous functions", async () => {
    const error = new Error("Sync error");
    const syncErrorFn = () => {
      throw error;
    };
    const onError = vi.fn();
    const result = await safeExecute(syncErrorFn, { onError });

    expect(result.data).toBeNull();
    expect(result.isSuccess).toBe(false);
    expect(result.isError).toBe(true);
    expect(result.isLoading).toBe(false);
    expect(result.error).toEqual(error);
    expect(onError).toHaveBeenCalledWith(error);
  });

  test("handles errors in asynchronous functions", async () => {
    const error = new Error("Async error");
    const asyncErrorFn = async () => {
      throw error;
    };
    const onError = vi.fn();
    const result = await safeExecute(asyncErrorFn, { onError });

    expect(result.data).toBeNull();
    expect(result.isSuccess).toBe(false);
    expect(result.isError).toBe(true);
    expect(result.isLoading).toBe(false);
    expect(result.error).toEqual(error);
    expect(onError).toHaveBeenCalledWith(error);
  });

  test("times out if the function does not complete in time", async () => {
    // Function that never resolves within the timeout period
    const neverResolvingFn = () =>
      new Promise<string>((resolve) => {
        setTimeout(() => resolve("Never reached"), 10000);
      });
    const onError = vi.fn();
    const result = await safeExecute(neverResolvingFn, {
      timeoutMs: 100,
      onError,
    });

    expect(result.data).toBeNull();
    expect(result.isSuccess).toBe(false);
    expect(result.isError).toBe(true);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBeInstanceOf(Error);
    expect((result.error as Error).message).toBe("Operation timed out");
    expect(onError).toHaveBeenCalledWith(result.error);
  });
});
