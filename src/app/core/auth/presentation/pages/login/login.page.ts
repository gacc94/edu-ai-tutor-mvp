import { Component, Inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ISignInWithProviderUseCase, IUserAuthUseCase } from '@core/auth/application/interfaces';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { AuthProvider } from '@core/auth/domain/enums';
import { SIGN_IN_WITH_PROVIDER_USE_CASE, USER_AUTH_USE_CASE } from '@core/auth/infrastructure/providers/providers';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: true,
    imports: [IonContent, IonSpinner],
})
export class LoginPage {
    $isLoading = signal(false);

    constructor(
        @Inject(SIGN_IN_WITH_PROVIDER_USE_CASE) private readonly _signInWithProviderUseCase: ISignInWithProviderUseCase,
        @Inject(USER_AUTH_USE_CASE) private readonly _userAuthUseCase: IUserAuthUseCase,
        private readonly _router: Router
    ) {}

    async loginWithGoogle() {
        this.$isLoading.set(true);

        try {
            await this._signInWithProviderUseCase.execute(AuthProvider.GOOGLE);
            await this._userAuthUseCase.execute();

            this._navigateToHome();
        } catch (error) {
            console.error(error);
        } finally {
            this.$isLoading.set(false);
        }
    }

    private _navigateToHome() {
        this._router.navigate(['/home']);
    }
}
