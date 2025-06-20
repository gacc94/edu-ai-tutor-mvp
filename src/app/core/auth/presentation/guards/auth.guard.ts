import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../application/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._authService.isAuthenticated()) {
            return true;
        }

        return this._router.createUrlTree(['/auth/login']);
    }
}
