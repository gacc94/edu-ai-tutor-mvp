import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/application/services/auth.service';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: true,
    imports: [IonContent, IonSpinner],
})
export class LoginPage {
    isLoading = signal(false);

    constructor(private _router: Router, private _authService: AuthService, private loginService: LoginService) {
        const sum = this.loginService.suma(5, 10);
        console.log('Resultado de la suma:', sum);
    }

    async loginWithGoogle() {
        this.isLoading.set(true);

        const response = await this._authService.signInWithGoogle();
        console.log({ response });

        await this._router.navigate(['/home']);
        this.isLoading.set(false);
    }
}
