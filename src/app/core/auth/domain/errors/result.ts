import { DomainError, Result } from './domain.error';

/**
 * Utility class for working with Result types in a more functional way
 */
export class ResultUtil {
  /**
   * Wrap a function that might throw into a Result
   */
  static async fromThrowable<T, E extends DomainError = DomainError>(
    fn: () => Promise<T>,
    errorFn: (error: unknown) => E
  ): Promise<Result<T, E>> {
    try {
      const result = await fn();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: errorFn(error) };
    }
  }

  /**
   * Map a successful result to a new type
   */
  static map<T, U, E extends DomainError>(
    result: Result<T, E>,
    fn: (value: T) => U
  ): Result<U, E> {
    return result.success
      ? { success: true, data: fn(result.data) }
      : result;
  }

  /**
   * Map an error to a new error type
   */
  static mapError<T, E extends DomainError, F extends DomainError>(
    result: Result<T, E>,
    fn: (error: E) => F
  ): Result<T, F> {
    return result.success ? result : { success: false, error: fn(result.error) };
  }

  /**
   * Chain a result to another result
   */
  static andThen<T, U, E extends DomainError>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>
  ): Result<U, E> {
    return result.success ? fn(result.data) : result;
  }

  /**
   * Handle both success and error cases
   */
  static fold<T, U, E extends DomainError>(
    result: Result<T, E>,
    onSuccess: (value: T) => U,
    onError: (error: E) => U
  ): U {
    return result.success ? onSuccess(result.data) : onError(result.error);
  }

  /**
   * Get the value or throw if it's an error
   */
  static getOrThrow<T, E extends DomainError>(
    result: Result<T, E>,
    customMessage?: string
  ): T {
    if (result.success) {
      return result.data;
    }
    if (customMessage) {
      result.error.message = `${customMessage}: ${result.error.message}`;
    }
    throw result.error;
  }

  /**
   * Get the value or a default if it's an error
   */
  static getOrElse<T, E extends DomainError>(
    result: Result<T, E>,
    defaultValue: T
  ): T {
    return result.success ? result.data : defaultValue;
  }

  /**
   * Check if the result is a success
   */
  static isSuccess<T, E extends DomainError>(
    result: Result<T, E>
  ): result is { success: true; data: T } {
    return result.success;
  }

  /**
   * Check if the result is an error
   */
  static isError<T, E extends DomainError>(
    result: Result<T, E>
  ): result is { success: false; error: E } {
    return !result.success;
  }
}
