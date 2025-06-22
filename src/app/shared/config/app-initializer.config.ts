import { APP_INITIALIZER, inject } from '@angular/core';
import { AuthService } from '@core/auth/application/services/auth.service';

export function initializeApp() {
    const authService = inject(AuthService);

    return () => {
        return new Promise<void>((resolve) => {
            // Check current user on app startup
            authService
                .getCurrentUser()
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.error('App initialization error:', error);
                    resolve(); // Continue app startup even if auth check fails
                });
        });
    };
}

export const appInitializerProviders = [
    {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        multi: true,
    },
];
