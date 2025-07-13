import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { WITH_AUTH_TOKEN } from './http-context.tokens';
import { TOKEN_STATE } from '@core/auth/infrastructure/providers/providers';
import { from, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { STATE_REGISTER_TOKEN } from '@shared/storage/providers/storage.provider';
import { TokenService } from '@shared/services/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenState = inject(TOKEN_STATE);
    const register = inject(STATE_REGISTER_TOKEN);
    const tokenService = inject(TokenService);
    const router = inject(Router);

    const httpContextToken = req.context.get(WITH_AUTH_TOKEN);

    return from(tokenState.getStorage()).pipe(
        switchMap(() => {
            const token = tokenState.$state()?.token;

            if (!token || !httpContextToken) return next(req);

            if (tokenService.isTokenExpired(token)) {
                register.clearAll();
                router.navigate(['/auth']);
                return next(req);
            }

            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return next(authReq);
        })
    );
};
