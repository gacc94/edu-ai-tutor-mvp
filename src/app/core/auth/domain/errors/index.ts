// Export all error types and utilities
export * from './domain.error';
export * from './error.handler';

// Re-export commonly used error types for easier imports
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
  isDomainError,
  success,
  failure,
  type Result,
} from './domain.error';

export { DomainErrorHandler, type ErrorHandlerConfig } from './error.handler';
