import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSpinner, IonButton, IonIcon, IonCard, IonCardContent, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGoogle, alertCircleOutline } from 'ionicons/icons';
import { AuthService } from '../../../application/services/auth.service';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: true,
    imports: [IonContent, IonSpinner, IonButton, IonIcon, IonCard, IonCardContent, IonImg, CommonModule],
})
export class LoginPage implements OnInit {
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);
    private readonly _ionicUtilsService = inject(IonicUtilsService);

    constructor() {
        addIcons({
            logoGoogle,
            alertCircleOutline,
        });
    }

    ngOnInit() {
        // Check if user is already authenticated
        if (this._authService.isAuthenticated()) {
            this._router.navigate(['/home']);
        }
    }

    async loginWithGoogle() {
        try {
            this.isLoading.set(true);
            this.error.set(null);

            await this._authService.signInWithGoogle();

            await this._ionicUtilsService.presentToast({
                message: '¡Bienvenido a EduAI Tutor!',
                duration: 2000,
                color: 'success',
                position: 'top',
            });

            setTimeout(() => {
                this.isLoading.set(false);
                this._router.navigate(['/home']);
            }, 1500);
        } catch (error) {
            this.isLoading.set(false);
            this.error.set('Error al iniciar sesión. Inténtalo de nuevo.');
            console.error('Google sign-in error:', error);

            await this._ionicUtilsService.presentToast({
                message: 'Error al iniciar sesión con Google',
                duration: 3000,
                color: 'danger',
                position: 'top',
            });
        }
    }

    clearError() {
        this.error.set(null);
    }
}
