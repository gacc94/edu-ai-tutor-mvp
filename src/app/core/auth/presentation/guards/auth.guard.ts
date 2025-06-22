import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../../application/services/auth.service';
import { AUTH_STATE } from '../../application/states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { AuthState } from '../../application/states/interfaces/auth.state';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private readonly _authService = inject(AuthService);
    private readonly _authState = inject(AUTH_STATE);
    private readonly _router = inject(Router);

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._checkAuthState();
    }

    private async _checkAuthState(): Promise<boolean | UrlTree> {
        try {
            // First check if we have a stored auth state
            const storedAuthState = this._authState.$state();

            if (storedAuthState?.isAuthenticated && storedAuthState.user) {
                return true;
            }

            // If no stored state, check with Firebase
            const currentUser = await this._authService.getCurrentUser();

            if (currentUser && currentUser.canUseService) {
                return true;
            }

            // Redirect to login if not authenticated
            return this._router.createUrlTree(['/auth/login']);
        } catch (error) {
            console.error('Auth guard error:', error);
            return this._router.createUrlTree(['/auth/login']);
        }
    }
}
