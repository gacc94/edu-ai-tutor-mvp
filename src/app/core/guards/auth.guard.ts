import { from, switchMap, of, map } from 'rxjs';
import { inject } from '@angular/core';
import { TOKEN_STATE } from '@core/auth/infrastructure/providers/providers';
import { Router } from '@angular/router';
import { STATE_REGISTER_TOKEN } from '@shared/storage/providers/storage.provider';
import { TokenService } from '@shared/services/token.service';

export const authGuard = () => {
    const tokenState = inject(TOKEN_STATE);
    const register = inject(STATE_REGISTER_TOKEN);
    const tokenService = inject(TokenService);
    const router = inject(Router);

    return from(tokenState.getStorage()).pipe(
        map(() => {
            const token = tokenState.$state()?.token;

            if (tokenService.isTokenExpired(token)) {
                register.clearAll();
                router.navigate(['/auth']);
                return false;
            }

            return true;
        })
    );
};
