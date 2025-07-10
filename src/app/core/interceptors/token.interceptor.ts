import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { WITH_AUTH_TOKEN } from './http-context.tokens';
import { TOKEN_STATE } from '@core/auth/infrastructure/providers/providers';
import { from, switchMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenState = inject(TOKEN_STATE);
    const token = tokenState.$state()?.token;

    const withAuthToken = req.context.get(WITH_AUTH_TOKEN);

    const isApiRequest = req.url.startsWith('/api');

    return from(tokenState.getStorage()).pipe(
        switchMap(() => {
            if (withAuthToken && token) {
                const authReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return next(authReq);
            }

            if (!isApiRequest) return next(req);

            return next(req);
        })
    );
};
//     if (withAuthToken && token) {
//         const authReq = req.clone({
//             setHeaders: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return next(authReq);
//     }

//     return next(req);
// };
