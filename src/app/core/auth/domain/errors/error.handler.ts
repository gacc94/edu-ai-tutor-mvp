import { Inject, Injectable, Optional, InjectionToken, OnDestroy } from '@angular/core';
import { Logger } from '@core/shared/services/logger.service';
import {
    DomainError,
    ValidationError,
    EntityNotFoundError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError,
    InvalidOperationError,
    RateLimitExceededError,
    ServiceUnavailableError,
    isDomainError,
} from './domain.error';

/**
 * Configuration for the error handler
 */
/**
 * Injection token for error handler options
 */
export const ERROR_HANDLER_OPTIONS = new InjectionToken<ErrorHandlerConfig>('ERROR_HANDLER_OPTIONS');

/**
 * Configuration for the error handler
 */
export interface ErrorHandlerConfig {
    /** Whether to log errors automatically */
    logErrors: boolean;
    /** Whether to rethrow errors after handling */
    rethrow: boolean;
    /** Custom error messages */
    messages?: Record<string, string>;
}

const defaultConfig: ErrorHandlerConfig = {
    logErrors: true,
    rethrow: false,
};

/**
 * Service for handling domain errors in a centralized way
 */
@Injectable({
    providedIn: 'root'
})
export class DomainErrorHandler implements OnDestroy {
    private destroyed = false;
    private config: ErrorHandlerConfig;

    constructor(
        @Inject(Logger) protected readonly logger: Logger,
        @Optional() @Inject(ERROR_HANDLER_OPTIONS) config?: ErrorHandlerConfig
    ) {
        this.config = { ...defaultConfig, ...config };
    }

    /**
     * Clean up resources when the service is destroyed
     */
    ngOnDestroy(): void {
        this.destroyed = true;
    }

    /**
     * Handle an error that occurred in the domain layer
     * @param error The error to handle
     * @param context Additional context about where the error occurred
     * @returns The processed error
     */
    handleError<T extends Error>(
        error: T | DomainError | unknown,
        context?: {
            /** Name of the operation that failed */
            operation?: string;
            /** Additional context data */
            context?: Record<string, unknown>;
            /** Whether to override the default config for this error */
            config?: Partial<ErrorHandlerConfig>;
        }
    ): never | void {
        const operation = context?.operation || 'unknown';
        const errorContext = context?.context || {};
        const config = { ...this.config, ...context?.config };

        // If it's not a domain error, wrap it
        const domainError = isDomainError(error)
            ? error
            : new DomainError(
                  error instanceof Error ? error.message : 'An unknown error occurred',
                  'UNKNOWN_ERROR',
                  { originalError: error, ...errorContext },
                  error instanceof Error ? error : undefined
              );

        // Log the error if configured to do so
        if (config.logErrors) {
            this.logError(domainError, operation, errorContext);
        }

        // Rethrow if configured to do so
        if (config.rethrow) {
            throw domainError;
        }

        // For certain error types, we might want to perform additional actions
        this.handleSpecificError(domainError, operation, errorContext);
    }

    /**
     * Handle specific error types with custom logic
     */
    private handleSpecificError(error: DomainError, operation: string, context: Record<string, unknown>): void {
        // Example: Special handling for specific error types
        if (error instanceof UnauthorizedError) {
            // Redirect to login, clear session, etc.
            // You might want to inject a service here to handle this
            console.warn('Authentication required', { operation, ...context });
        } else if (error instanceof ForbiddenError) {
            // Show access denied UI
            console.warn('Access denied', { operation, ...context });
        } else if (error instanceof RateLimitExceededError) {
            // Show rate limit message to user
            console.warn('Rate limit exceeded', { operation, ...context });
        } else if (error instanceof ServiceUnavailableError) {
            // Show service unavailable message to user
            console.warn('Service unavailable', { operation, ...context });
        }
    }

    /**
     * Log an error with appropriate severity
     */
    private logError(error: DomainError, operation: string, context: Record<string, unknown>): void {
        const logContext = {
            operation,
            error: {
                name: error.name,
                code: error.code,
                message: error.message,
                details: error.details,
                stack: error.stack,
            },
            ...context,
        };

        // Use appropriate log level based on error type
        if (error instanceof ValidationError) {
            this.logger.warn('Validation error occurred', logContext);
        } else if (error instanceof UnauthorizedError || error instanceof ForbiddenError) {
            this.logger.warn('Authorization issue', logContext);
        } else if (error instanceof EntityNotFoundError) {
            this.logger.warn('Resource not found', logContext);
        } else if (error instanceof ConflictError) {
            this.logger.warn('Conflict detected', logContext);
        } else if (error instanceof ServiceUnavailableError) {
            this.logger.error('Service unavailable', logContext);
        } else {
            this.logger.error('Unexpected error occurred', logContext);
        }
    }

    /**
     * Create a validation error
     */
    createValidationError(message: string, field?: string, details?: Record<string, unknown>): ValidationError {
        return new ValidationError(message, field, details);
    }

    /**
     * Create an entity not found error
     */
    createNotFoundError(entityName: string, id?: string, details?: Record<string, unknown>): EntityNotFoundError {
        return new EntityNotFoundError(entityName, id, details);
    }

    /**
     * Create an unauthorized error
     */
    createUnauthorizedError(message = 'Unauthorized', details?: Record<string, unknown>): UnauthorizedError {
        return new UnauthorizedError(message, details);
    }

    /**
     * Create a forbidden error
     */
    createForbiddenError(message = 'Forbidden', details?: Record<string, unknown>): ForbiddenError {
        return new ForbiddenError(message, details);
    }

    /**
     * Create a conflict error
     */
    createConflictError(message: string, resource?: string, details?: Record<string, unknown>): ConflictError {
        return new ConflictError(message, resource, details);
    }

    /**
     * Create an invalid operation error
     */
    createInvalidOperationError(message: string, details?: Record<string, unknown>): InvalidOperationError {
        return new InvalidOperationError(message, details);
    }

    /**
     * Create a rate limit exceeded error
     */
    createRateLimitExceededError(
        message: string,
        retryAfter?: number,
        details?: Record<string, unknown>,
        cause?: Error
    ): RateLimitExceededError {
        // Ensure retryAfter is a number or undefined
        const retryAfterMs = typeof retryAfter === 'number' ? retryAfter : undefined;
        return new RateLimitExceededError(message, retryAfterMs, details, cause);
    }

    /**
     * Create a service unavailable error
     */
    createServiceUnavailableError(message: string, details?: Record<string, unknown>): ServiceUnavailableError {
        return new ServiceUnavailableError(message, details);
    }
}
