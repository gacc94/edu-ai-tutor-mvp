import type { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_STATE } from '@core/auth/application/states/states';
import { inject } from '@angular/core';
import { WITH_AUTH_TOKEN } from './http-context.tokens';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenState = inject(TOKEN_STATE).$state();
    const token = tokenState?.token;

    const withAuthToken = req.context.get(WITH_AUTH_TOKEN);

    const isApiRequest = req.url.startsWith('/api');

    if (withAuthToken && token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        return next(authReq);
    }

    return next(req);
};
