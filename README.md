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

Safe Execute is a versatile utility library that simplifies the execution of asynchronous tasks while handling errors gracefully. It not only provides core functions like tryCatch and safeExecute, but also includes three additional utilities—throttle, debounce, and cache—to improve performance and control.

## Installation

You can add Safe Execute to your project using npm or pnpm:

- Using npm:

  ```bash
  npm install @rahulc0dy/safe-execute
  ```

- Using pnpm

  ```bash
  pnpm add @rahulc0dy/safe-execute
  ```

## Usage

### Core Functions

- tryCatch  
  Execute a promise safely and get either the data or error without try/catch blocks.

- safeExecute  
  Run synchronous or asynchronous functions with built-in error handling and optional callbacks.

### Additional Utility Functions

- throttle  
  Rate-limit a function so it executes at most once per defined interval.

- debounce  
  Delay function execution until a period of inactivity, ideal for inputs and filtering.

- cache  
  Cache the result of asynchronous calls to prevent redundant execution.

For detailed usage examples and API descriptions, refer to the sections below or check the documentation within your IDE.

## API Overview

### tryCatch

**Signature:**

```typescript
async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<{ data: T | null; error: E | null }>;
```

- On success: `{ data: T, error: null }`
- On failure: `{ data: null, error: E }`

### safeExecute

**Signature:**

```typescript
async function safeExecute<T>(
  fn: () => Promise<T> | T,
  options?: {
    onSuccess?: (result: T) => void;
    onError?: (error: unknown) => void;
    timeoutMs?: number;
  }
): Promise<{
  data: T | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  error: unknown;
}>;
```

Executes a given function safely, handling both synchronous and asynchronous operations, with optional callbacks and a timeout.

### throttle

**Signature:**

```typescript
function throttle<T extends (...args: any[]) => any>(fn: T, wait: number): T;
```

Returns a throttled version of the function that only executes once within the specified wait time.

### debounce

**Signature:**

```typescript
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T;
```

Returns a debounced version of the function that delays execution until after the delay period has passed without further invocation.

### cache

**Signature:**

```typescript
function cache<T extends (...args: any[]) => Promise<any>>(fn: T): T;
```

Caches the result of asynchronous function calls to avoid redundant executions when called with the same arguments.

## Contributing

Contributions are welcome! Please refer to our [contributing guidelines](CONTRIBUTING.md) for details on how to help improve the project.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an [issue](https://github.com/rahulc0dy/safe-execute/issues) for assistance.
