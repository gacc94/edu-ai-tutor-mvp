import { NgModule, Optional, SkipSelf, Inject, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logger } from '../../../shared/services/logger.service';
import { DomainErrorHandler, ErrorHandlerConfig, ERROR_HANDLER_OPTIONS } from './error.handler';

/**
 * Module that provides domain error handling capabilities
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    Logger,
    {
      provide: ERROR_HANDLER_OPTIONS,
      useValue: {
        logErrors: true,
        rethrow: false,
        messages: {
          VALIDATION_ERROR: 'Validation failed',
          UNAUTHORIZED: 'Authentication required',
          FORBIDDEN: 'Insufficient permissions',
          ENTITY_NOT_FOUND: 'The requested resource was not found',
          CONFLICT: 'A conflict occurred',
          INVALID_OPERATION: 'The operation is not valid',
          RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
          SERVICE_UNAVAILABLE: 'Service is currently unavailable',
        },
      } as ErrorHandlerConfig,
    },
    DomainErrorHandler,
  ],
})
export class DomainErrorModule {
  constructor(@Optional() @SkipSelf() parentModule?: DomainErrorModule) {
    if (parentModule) {
      throw new Error(
        'DomainErrorModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
