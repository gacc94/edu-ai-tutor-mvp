import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../application/services/auth.service';
import { AUTH_STATE } from '../../application/states/states';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {
    private readonly _authService = inject(AuthService);
    private readonly _authState = inject(AUTH_STATE);
    private readonly _router = inject(Router);

    async canActivate(): Promise<boolean | UrlTree> {
        try {
            // Check if user is already authenticated
            const storedAuthState = this._authState.$state();

            if (storedAuthState?.isAuthenticated && storedAuthState.user) {
                return this._router.createUrlTree(['/home']);
            }

            // Double check with Firebase
            const currentUser = await this._authService.getCurrentUser();

            if (currentUser && currentUser.canUseService) {
                return this._router.createUrlTree(['/home']);
            }

            // Allow access to login page
            return true;
        } catch (error) {
            console.error('Login guard error:', error);
            // Allow access to login page on error
            return true;
        }
    }
}
