import { ValidationError } from '../errors';

/**
 * Utility class for common validations
 */
export class ValidationUtils {
  /**
   * Validates that a value is not null or undefined
   */
  static required<T>(
    value: T | null | undefined,
    field: string,
    message = `${field} is required`
  ): T {
    if (value === null || value === undefined) {
      throw new ValidationError(message, field);
    }
    return value;
  }

  /**
   * Validates that a string is not empty
   */
  static notEmpty(
    value: string | null | undefined,
    field: string,
    message = `${field} cannot be empty`
  ): string {
    const val = this.required(value, field, message);
    if (typeof val !== 'string' || val.trim().length === 0) {
      throw new ValidationError(message, field);
    }
    return val;
  }

  /**
   * Validates that a number is within a range
   */
  static inRange(
    value: number,
    field: string,
    min: number,
    max: number,
    message = `${field} must be between ${min} and ${max}`
  ): number {
    if (typeof value !== 'number' || value < min || value > max) {
      throw new ValidationError(message, field, { min, max, actual: value });
    }
    return value;
  }

  /**
   * Validates that a string matches a regex pattern
   */
  static matches(
    value: string,
    field: string,
    pattern: RegExp,
    message = `${field} has an invalid format`
  ): string {
    if (!pattern.test(value)) {
      throw new ValidationError(message, field, { pattern: pattern.toString() });
    }
    return value;
  }

  /**
   * Validates that a string has a minimum length
   */
  static minLength(
    value: string,
    field: string,
    min: number,
    message = `${field} must be at least ${min} characters long`
  ): string {
    if (value.length < min) {
      throw new ValidationError(message, field, { min, actual: value.length });
    }
    return value;
  }

  /**
   * Validates that a string has a maximum length
   */
  static maxLength(
    value: string,
    field: string,
    max: number,
    message = `${field} cannot be longer than ${max} characters`
  ): string {
    if (value.length > max) {
      throw new ValidationError(message, field, { max, actual: value.length });
    }
    return value;
  }

  /**
   * Validates an email address
   */
  static email(
    value: string,
    field = 'email',
    message = 'Invalid email address'
  ): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.matches(value, field, emailRegex, message);
  }

  /**
   * Validates that a value is one of the allowed values
   */
  static oneOf<T extends string | number>(
    value: T,
    field: string,
    allowedValues: readonly T[],
    message = `${field} must be one of: ${allowedValues.join(', ')}`
  ): T {
    if (!allowedValues.includes(value)) {
      throw new ValidationError(message, field, { allowedValues, actual: value });
    }
    return value;
  }

  /**
   * Validates that a condition is true
   */
  static check(
    condition: boolean,
    message: string,
    field = 'general',
    details?: Record<string, unknown>
  ): void {
    if (!condition) {
      throw new ValidationError(message, field, details);
    }
  }

  /**
   * Combines multiple validation errors into a single error
   */
  static combine(results: (void | ValidationError)[]): void {
    const errors = results.filter(
      (result): result is ValidationError => result instanceof ValidationError
    );

    if (errors.length > 0) {
      if (errors.length === 1) {
        throw errors[0];
      }
      throw new ValidationError(
        'Multiple validation errors occurred',
        'validation',
        { errors: errors.map((e) => e.toJSON()) }
      );
    }
  }

  /**
   * Validates an object against a schema
   */
  static validateObject<T>(
    obj: T,
    schema: {
      [K in keyof T]?: (value: T[K], field: string) => T[K];
    }
  ): T {
    const result = { ...obj };
    const errors: ValidationError[] = [];

    for (const [key, validator] of Object.entries(schema)) {
      try {
        if (validator) {
          // @ts-ignore - We know the types match
          result[key as keyof T] = validator(obj[key as keyof T], key);
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          errors.push(error);
        } else {
          throw error;
        }
      }
    }

    if (errors.length > 0) {
      if (errors.length === 1) {
        throw errors[0];
      }
      throw new ValidationError('Multiple validation errors occurred', 'validation', {
        errors: errors.map((e) => e.toJSON()),
      });
    }

    return result;
  }
}
