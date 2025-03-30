import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { cache } from "../src/cache";

describe("cache", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should cache function results", () => {
    let callCount = 0;
    const add = (a: number, b: number) => {
      callCount++;
      return a + b;
    };

    const cachedAdd = cache(add);

    expect(cachedAdd(1, 2)).toBe(3);
    expect(cachedAdd(1, 2)).toBe(3);
    expect(callCount).toBe(1);
  });

  test("should respect TTL option", () => {
    let callCount = 0;
    const getData = () => {
      callCount++;
      return "data";
    };

    const cachedGetData = cache(getData, { ttl: 1000 });

    expect(cachedGetData()).toBe("data");
    expect(cachedGetData()).toBe("data");
    expect(callCount).toBe(1);

    vi.advanceTimersByTime(1500);

    expect(cachedGetData()).toBe("data");
    expect(callCount).toBe(2);
  });

  test("should respect maxSize option", () => {
    let callCount = 0;
    const getData = (key: string) => {
      callCount++;
      return key;
    };

    const cachedGetData = cache(getData, { maxSize: 2 });

    cachedGetData("a");
    cachedGetData("b");
    cachedGetData("c");

    // Should evict 'a' from cache
    cachedGetData("a");

    expect(callCount).toBe(4);
  });

  test("should handle different argument types", () => {
    let callCount = 0;
    const process = (num: number, str: string, obj: object) => {
      callCount++;
      return true;
    };

    const cachedProcess = cache(process);

    expect(cachedProcess(1, "test", { foo: "bar" })).toBe(true);
    expect(cachedProcess(1, "test", { foo: "bar" })).toBe(true);
    expect(callCount).toBe(1);
  });

  test("should preserve this context", () => {
    class Calculator {
      private multiplier: number;

      constructor(multiplier: number) {
        this.multiplier = multiplier;
      }

      multiply(x: number) {
        return x * this.multiplier;
      }
    }

    const calc = new Calculator(2);
    const cachedMultiply = cache(calc.multiply.bind(calc));

    expect(cachedMultiply(5)).toBe(10);
    expect(cachedMultiply(5)).toBe(10);
  });
});
