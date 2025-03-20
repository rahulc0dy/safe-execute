"use strict";
// safeExecute.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeExecute = safeExecute;
/**
 * Safely executes a function (sync or async) and returns an object with the execution result and state.
 *
 * @param fn - The function to execute safely. It can return a value or a promise.
 * @param options - Optional callbacks for success and error handling.
 * @returns {Promise<SafeExecutionResult<T>>} A promise that resolves with the function's result and state flags.
 */
function safeExecute(fn, options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let result = null;
        let isError = false;
        let isSuccess = false;
        let isLoading = true;
        try {
            result = yield fn();
            isSuccess = true;
            (_a = options === null || options === void 0 ? void 0 : options.onSuccess) === null || _a === void 0 ? void 0 : _a.call(options, result);
        }
        catch (error) {
            isError = true;
            (_b = options === null || options === void 0 ? void 0 : options.onError) === null || _b === void 0 ? void 0 : _b.call(options, error);
        }
        finally {
            isLoading = false;
        }
        return { data: result, isError, isSuccess, isLoading };
    });
}
