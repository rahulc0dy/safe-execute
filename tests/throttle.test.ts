import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { throttle } from "../src/throttle";

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should execute function immediately on first call", () => {
    let callCount = 0;
    const func = () => {
      callCount++;
    };
    const throttled = throttle(func, 100);

    throttled();
    expect(callCount).toBe(1);
  });

  test("should ignore calls within wait period", () => {
    let callCount = 0;
    const func = () => {
      callCount++;
      return callCount;
    };
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled();

    expect(callCount).toBe(1);
  });

  test("should execute after wait period", () => {
    let callCount = 0;
    const func = () => {
      callCount++;
    };
    const throttled = throttle(func, 100);

    throttled();
    vi.advanceTimersByTime(50);
    throttled();
    vi.advanceTimersByTime(51);
    throttled();

    expect(callCount).toBe(2);
  });

  test("should return last result during throttle period", () => {
    let counter = 0;
    const func = () => ++counter;
    const throttled = throttle(func, 100);

    expect(throttled()).toBe(1);
    expect(throttled()).toBe(1); // Returns last result

    vi.advanceTimersByTime(101);
    expect(throttled()).toBe(2);
  });

  test("should preserve this context", () => {
    class Counter {
      private count = 0;

      increment() {
        this.count++;
        return this.count;
      }

      getCount() {
        return this.count;
      }
    }

    const counter = new Counter();
    const throttledIncrement = throttle(counter.increment.bind(counter), 100);

    throttledIncrement();
    throttledIncrement();

    expect(counter.getCount()).toBe(1);
  });

  test("should handle trailing calls correctly", () => {
    let lastCallArgs: number[] = [];
    const func = (...args: number[]) => {
      lastCallArgs = args;
    };
    const throttled = throttle(func, 100);

    throttled(1);
    throttled(2);
    throttled(3);

    vi.advanceTimersByTime(101);
    expect(lastCallArgs).toEqual([3]);
  });
});
