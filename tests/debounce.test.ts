import { describe, it, expect, vi, beforeEach } from "vitest";
import { debounce } from "../src/debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should execute the function after the specified wait time", () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(99);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should only execute once for multiple calls within wait period", () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should maintain the correct context", function () {
    const context = { value: "test" };
    const callback = function (this: typeof context) {
      expect(this.value).toBe("test");
    };

    const debouncedFn = debounce(callback, 100);
    debouncedFn.call(context);
    vi.advanceTimersByTime(100);
  });

  it("should reject arrow functions", () => {
    const arrowFn = () => {};
    const debouncedFn = debounce(arrowFn, 100);

    expect(() => debouncedFn()).toThrow(TypeError);
  });

  it("should pass arguments correctly", () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn("test", 123);
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith("test", 123);
  });
});
