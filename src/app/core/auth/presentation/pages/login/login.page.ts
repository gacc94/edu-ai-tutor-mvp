import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { logoGoogle } from 'ionicons/icons';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: true,
    imports: [CommonModule, IonContent, IonSpinner],
})
export class LoginPage implements OnInit {
    isLoading = false;
    #authService = inject(AuthService);

    constructor(private router: Router) {
        addIcons({
            // logoGoogle,
        });
    }

    ngOnInit() {
        // Inicialización si es necesaria
    }

    signIn() {
        this.isLoading = true;
        //TODO: Aquí iría la lógica de autenticación estándar
        // setTimeout(() => {
        //     this.isLoading = false;
        //     this.router.navigate(['/home']);
        // }, 1500);
    }

    async loginWithGoogle() {
        try {
            this.isLoading = true;
            const result = await this.#authService.signInWithGoogle();
            console.log({ result });

            this.isLoading = false;
            this.router.navigate(['/home']);
        } catch (error) {
            this.isLoading = false;
            console.error('Google sign-in error:', error);
        }
    }

    goToSignUp() {
        // Navegar a la página de registro
        console.log('Navegando a registro');
        // this.router.navigate(['/register']);
    }
}
