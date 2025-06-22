// Extend the Error interface to include captureStackTrace in TypeScript
declare global {
  interface ErrorConstructor {
    captureStackTrace(targetObject: Object, constructorOpt?: Function): void;
  }
}

/**
 * Base class for all domain errors in the auth module
 */
export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, unknown>,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = this.constructor.name;
    
    // Maintain proper stack trace in V8 environments
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
    
    // Set the prototype explicitly for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
  
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      details: this.details,
      ...(this.cause && { cause: this.cause.message })
    };
  }
}

/**
 * Error thrown when validation fails
 */
class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field?: string,
    details?: Record<string, unknown>,
    cause?: Error
  ) {
    super(message, 'VALIDATION_ERROR', { field, ...details }, cause);
  }
}

/**
 * Error thrown when an entity is not found
 */
class EntityNotFoundError extends DomainError {
  constructor(
    entityName: string,
    public readonly id?: string,
    details?: Record<string, unknown>,
    cause?: Error
  ) {
    super(
      id ? `${entityName} with id ${id} not found` : `${entityName} not found`,
      'ENTITY_NOT_FOUND',
      { entityName, id, ...details },
      cause
    );
  }
}

/**
 * Error thrown when authentication is required
 */
class UnauthorizedError extends DomainError {
  constructor(message = 'Unauthorized', details?: Record<string, unknown>, cause?: Error) {
    super(message, 'UNAUTHORIZED', details, cause);
  }
}

/**
 * Error thrown when access is forbidden
 */
class ForbiddenError extends DomainError {
  constructor(message = 'Forbidden', details?: Record<string, unknown>, cause?: Error) {
    super(message, 'FORBIDDEN', details, cause);
  }
}

/**
 * Error thrown when a conflict occurs (e.g., duplicate entity)
 */
class ConflictError extends DomainError {
  constructor(
    message: string,
    public readonly resource?: string,
    details?: Record<string, unknown>,
    cause?: Error
  ) {
    super(message, 'CONFLICT', { resource, ...details }, cause);
  }
}

/**
 * Error thrown for invalid operations
 */
class InvalidOperationError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>, cause?: Error) {
    super(message, 'INVALID_OPERATION', details, cause);
  }
}

/**
 * Error thrown when rate limits are exceeded
 */
class RateLimitExceededError extends DomainError {
  constructor(
    message = 'Rate limit exceeded',
    public readonly retryAfter?: number,
    details?: Record<string, unknown>,
    cause?: Error
  ) {
    super(message, 'RATE_LIMIT_EXCEEDED', { retryAfter, ...details }, cause);
  }
}

/**
 * Error thrown when a service is unavailable
 */
class ServiceUnavailableError extends DomainError {
  constructor(serviceName: string, details?: Record<string, unknown>, cause?: Error) {
    super(
      `${serviceName} is currently unavailable`,
      'SERVICE_UNAVAILABLE',
      { serviceName, ...details },
      cause
    );
  }
}

/**
 * Result type for operations that can fail
 */
type Result<T, E extends DomainError = DomainError> = 
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Creates a success result
 */
function success<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Creates an error result
 */
function failure<E extends DomainError>(error: E): Result<never, E> {
  return { success: false, error };
}

/**
 * Type guard to check if an error is a domain error
 */
function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError || 
         (error instanceof Error && 
          'code' in error && 
          typeof (error as any).code === 'string');
}

/**
 * Helper to create validation errors
 */
function createValidationError(
  message: string, 
  field?: string, 
  details?: Record<string, unknown>
): ValidationError {
  return new ValidationError(message, field, details);
}

export {
  DomainError as BaseDomainError,
  ValidationError,
  EntityNotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InvalidOperationError,
  RateLimitExceededError,
  ServiceUnavailableError,
  success,
  failure,
  isDomainError,
  createValidationError,
  type Result
};
