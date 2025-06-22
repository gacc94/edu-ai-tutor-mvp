import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSpinner, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGoogle } from 'ionicons/icons';
import { AuthService } from '../../../application/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: true,
    imports: [IonContent, IonSpinner, IonToast, CommonModule],
})
export class LoginPage implements OnInit {
    isLoading = signal(false);
    errorMessage = signal<string | null>(null);
    showToast = signal(false);

    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    constructor() {
        addIcons({
            logoGoogle,
        });
    }

    ngOnInit() {
        // Check if user is already authenticated
        this._checkCurrentUser();
    }

    async loginWithGoogle() {
        try {
            this.isLoading.set(true);
            this.errorMessage.set(null);

            const result = await this._authService.signInWithGoogle();

            if (result.user) {
                // Navigate to home page
                await this._router.navigate(['/home']);
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
            this.errorMessage.set('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
            this.showToast.set(true);
        } finally {
            this.isLoading.set(false);
        }
    }

    private async _checkCurrentUser() {
        try {
            const user = await this._authService.getCurrentUser();
            if (user && user.canUseService) {
                await this._router.navigate(['/home']);
            }
        } catch (error) {
            console.error('Error checking current user:', error);
        }
    }

    onToastDismiss() {
        this.showToast.set(false);
        this.errorMessage.set(null);
    }
}
