import { inject } from '@angular/core';
import { TOKEN_STATE } from '@core/auth/infrastructure/providers/providers';
import { Router } from '@angular/router';
import { STATE_REGISTER_TOKEN } from '@shared/storage/providers/storage.provider';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthGuard = async () => {
    const tokenStorage = inject(TOKEN_STATE);
    const router = inject(Router);
    const register = inject(STATE_REGISTER_TOKEN);

    await tokenStorage.getStorage();

    const tokenState = tokenStorage.$state();

    if (!tokenState) {
        await register.clearAll();
        await router.navigate(['/auth']);
        return false;
    }

    return true;
};
