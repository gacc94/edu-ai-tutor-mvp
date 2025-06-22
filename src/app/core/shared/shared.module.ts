import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logger, NoopLogger } from './services/logger.service';

/**
 * Shared module that provides common services and utilities
 * throughout the application.
 * 
 * This module should only be imported once in the AppModule.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    // Provide the logger service
    { provide: Logger, useClass: Logger },
    
    // Provide a no-op logger for testing
    { provide: NoopLogger, useClass: NoopLogger }
  ]
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule?: SharedModule) {
    // Prevent reimport of the SharedModule
    if (parentModule) {
      throw new Error(
        'SharedModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
