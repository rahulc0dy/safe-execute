import { describe, it, expect } from "vitest";
import { safeExecute } from "../src/safeExecute";

describe("safeExecute", () => {
  it("executes a synchronous function and returns the value", async () => {
    const syncFn = () => 42;
    const result = await safeExecute(syncFn);
    expect(result.data).toBe(42);
    expect(result.isError).toBe(false);
    expect(result.isSuccess).toBe(true);
    expect(result.isLoading).toBe(false);
  });

  it("executes an asynchronous function and returns the value", async () => {
    const asyncFn = async () => {
      return "Hello, async!";
    };
    const result = await safeExecute(asyncFn);
    expect(result.data).toBe("Hello, async!");
    expect(result.isError).toBe(false);
    expect(result.isSuccess).toBe(true);
    expect(result.isLoading).toBe(false);
  });

  it("catches an error for a synchronous function", async () => {
    const errorFn = () => {
      throw new Error("Test error");
    };

    let onErrorCalled = false;
    const options = {
      onError: (error: unknown) => {
        onErrorCalled = true;
        expect(error).toEqual(new Error("Test error"));
      },
    };

    const result = await safeExecute(errorFn, options);
    expect(result.data).toBe(null);
    expect(result.isError).toBe(true);
    expect(result.isSuccess).toBe(false);
    expect(result.isLoading).toBe(false);
    expect(onErrorCalled).toBe(true);
  });

  it("catches an error for an asynchronous function", async () => {
    const asyncErrorFn = async () => {
      throw new Error("Async error");
    };

    let onErrorCalled = false;
    const options = {
      onError: (error: unknown) => {
        onErrorCalled = true;
        expect(error).toEqual(new Error("Async error"));
      },
    };

    const result = await safeExecute(asyncErrorFn, options);
    expect(result.data).toBe(null);
    expect(result.isError).toBe(true);
    expect(result.isSuccess).toBe(false);
    expect(result.isLoading).toBe(false);
    expect(onErrorCalled).toBe(true);
  });

  it("calls onSuccess callback when execution is successful", async () => {
    let onSuccessCalled = false;
    const options = {
      onSuccess: (data: number) => {
        onSuccessCalled = true;
        expect(data).toBe(10);
      },
    };

    const fn = () => 10;
    const result = await safeExecute(fn, options);
    expect(result.data).toBe(10);
    expect(result.isError).toBe(false);
    expect(result.isSuccess).toBe(true);
    expect(result.isLoading).toBe(false);
    expect(onSuccessCalled).toBe(true);
  });
});
