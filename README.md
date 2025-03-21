<div align="center" style="display: flex; gap: 1rem; justify-content: center;">
  <a href="https://github.com/rahulc0dy/safe-execute/releases">
    <img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/rahulc0dy/safe-execute">
  </a>
  <a href="https://github.com/rahulc0dy/safe-execute/issues">
    <img src="https://img.shields.io/github/issues/rahulc0dy/safe-execute" alt="Issues">
  </a>
  <a href="https://github.com/rahulc0dy/safe-execute">
    <img src="https://img.shields.io/github/stars/rahulc0dy/safe-execute" alt="GitHub Stars">
  </a>
  <a href="https://github.com/rahulc0dy/safe-execute">
    <img src="https://img.shields.io/coderabbit/prs/github/rahulc0dy/safe-execute?utm_source=oss&utm_medium=github&utm_campaign=rahulc0dy%2Fsafe-execute&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews" alt="CodeRabbit Reviews">
  </a>
</div>
<div align="center" style="display: flex; gap: 1rem; justify-content: center;">
  <a href="https://github.com/rahulc0dy/safe-execute/actions/workflows/tests.yml">
    <img src="https://github.com/rahulc0dy/safe-execute/actions/workflows/tests.yml/badge.svg" alt="Test Status">
  </a>
  <a href="https://github.com/rahulc0dy/safe-execute/actions/workflows/builds.yml">
    <img src="https://github.com/rahulc0dy/safe-execute/actions/workflows/builds.yml/badge.svg" alt="Build Status">
  </a>
</div>

# Safe Execute

Safe Execute is a lightweight TypeScript utility for safely executing functions—whether synchronous or asynchronous—with built-in error handling and state management. The package provides two primary functions:

- **tryCatch**: Wraps a promise in a try/catch block and returns a discriminated union indicating either a successful result or an error.
- **safeExecute**: Safely executes a function (sync or async), optionally with a timeout, and returns an object with execution state flags and any caught error.

## Features

- **Discriminated Union Result (tryCatch):**  
  Easily distinguish between successful and failed promise executions with a clear union type.

- **Safe Execution (safeExecute):**  
  Execute functions with built-in error handling, customizable callbacks, and optional timeout support.

- **Unified State Management:**  
  Retrieve execution status via `isLoading`, `isSuccess`, `isError`, and access the resulting `data` or `error`.

## Installation

Install the package via npm:

```bash
npm install safe-execute
```

## Usage

### tryCatch

Use `tryCatch` to wrap any promise and handle errors gracefully without throwing:

```typescript
import { tryCatch } from "safe-execute";

async function fetchData() {
  return fetch("https://api.example.com/data").then((res) => res.json());
}

async function main() {
  const result = await tryCatch(fetchData());
  if (result.error) {
    console.error("Error fetching data:", result.error);
  } else {
    console.log("Data fetched successfully:", result.data);
  }
}

main();
```

### safeExecute

Use `safeExecute` to safely execute any function (sync or async) with support for callbacks and an optional timeout:

```typescript
import { safeExecute } from "safe-execute";

async function processData() {
  // Simulate an asynchronous operation
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve("Processed data"), 1000)
  );
}

async function runProcess() {
  const result = await safeExecute(processData, {
    timeoutMs: 2000,
    onSuccess: (data) => console.log("Operation succeeded:", data),
    onError: (error) => console.error("Operation failed:", error),
  });

  console.log("Final result:", result);
}

runProcess();
```

## API

### tryCatch

**Signature:**

```typescript
async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>>;
```

- **Parameters:**
  - `promise`: A promise that resolves to a value of type `T`.
- **Returns:**
  - A discriminated union `Result<T, E>`:
    - On success: `{ data: T; error: null }`
    - On failure: `{ data: null; error: E }`

### safeExecute

**Signature:**

```typescript
async function safeExecute<T>(
  fn: () => Promise<T> | T,
  options?: SafeExecutionOptions<T> & { timeoutMs?: number }
): Promise<{
  data: T | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  error: unknown;
}>;
```

- **Parameters:**
  - `fn`: The function to execute (can be synchronous or asynchronous).
  - `options` (optional): An object that may include:
    - `onSuccess(result: T)`: Callback executed if the function succeeds.
    - `onError(error: unknown)`: Callback executed if the function throws an error.
    - `timeoutMs`: An optional timeout (in milliseconds) after which the operation is aborted.
- **Returns:**
  - An object with the following properties:
    - `data`: The function’s return value, or `null` if an error occurred.
    - `isError`: `true` if an error occurred; otherwise `false`.
    - `isSuccess`: `true` if the function executed successfully; otherwise `false`.
    - `isLoading`: `false` once the function execution completes.
    - `error`: The error object if an error occurred; otherwise `null`.

## Contributing

Contributions are welcome! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to help out.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.
