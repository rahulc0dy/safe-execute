<div align="center">
  <a href="https://github.com/rahulc0dy/safe-execute/releases">
    <img src="https://img.shields.io/badge/1.0.0-teal?label=version" alt="Version">
  </a>
  <a href="(https://github.com/rahulc0dy/safe-execute/actions/workflows/tests.yml">
    <img src="https://github.com/rahulc0dy/safe-execute/actions/workflows/tests.yml/badge.svg" alt="Test Status">
  </a>
  <a href="https://github.com/rahulc0dy/safe-execute/actions/workflows/builds.yml">
    <img src="https://github.com/rahulc0dy/safe-execute/actions/workflows/builds.yml/badge.svg" alt="Build Status">
  </a>
  <a href="https://github.com/rahulc0dy/safe-execute/issues">
    <img src="https://img.shields.io/github/issues/rahulc0dy/safe-execute" alt="Issues">
  </a>
  <a href="https://github.com/rahulc0dy/safe-execute">
    <img src="https://img.shields.io/github/stars/rahulc0dy/safe-execute" alt="GitHub Stars">
  </a>
  <a href="https://github.com/rahulc0dy/safe-execute">
    <img src="https://img.shields.io/coderabbit/prs/github/rahulc0dy/safe-execute?utm_source=oss&utm_medium=github&utm_campaign=rahulc0dy%2Fsafe-execute&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews" alt="GitHub Stars">
  </a>
</div>

# Safe Execute

Safe Execute is a lightweight TypeScript utility for safely executing functions—whether synchronous or asynchronous—with built-in error handling and state management.

## Features

- **Supports Async & Sync Functions:** Works with functions that return a value or a promise.
- **Custom Callbacks:** Define `onSuccess` and `onError` handlers to react to execution outcomes.
- **Unified State Object:** Returns an object containing:
  - `data`: The result of the function (or `null` if an error occurred).
  - `isError`: Boolean flag indicating if an error occurred.
  - `isSuccess`: Boolean flag indicating successful execution.
  - `isLoading`: Boolean flag indicating whether the function is still processing.

## Installation

Install the package via npm:

```bash
npm install safe-execute
```

## Usage

Below is an example of using Safe Execute with an asynchronous function:

```typescript
import { safeExecute } from "safe-execute";

const fetchData = async (): Promise<string> => {
  // Simulate an async operation (e.g., a network request)
  return await new Promise<string>((resolve) =>
    setTimeout(() => resolve("Hello, world!"), 1000)
  );
};

async function runExample() {
  const result = await safeExecute(fetchData, {
    onSuccess: (data) => console.log("Data received:", data),
    onError: (error) => console.error("Error encountered:", error),
  });

  console.log(result);
}

runExample();
```

## API

### `safeExecute<T>(fn: () => Promise<T> | T, options?: SafeExecutionOptions<T>): Promise<SafeExecutionResult<T>>`

- **Parameters:**
  - `fn`: The function to execute (can be synchronous or asynchronous).
  - `options` (optional):
    - `onSuccess(result: T)`: Callback executed if `fn` completes successfully.
    - `onError(error: unknown)`: Callback executed if `fn` throws an error.
- **Returns:** A promise that resolves to an object with:
  - `data`: The function’s return value or `null` if an error occurred.
  - `isError`: `true` if an error occurred, otherwise `false`.
  - `isSuccess`: `true` if the function executed successfully, otherwise `false`.
  - `isLoading`: `false` after the function execution completes.

## Contributing

Contributions are welcome! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to help out.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating.
