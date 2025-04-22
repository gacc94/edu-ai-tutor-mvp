import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    IonContent,
    IonButton,
    IonIcon,
    IonSpinner,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { logoGoogle } from 'ionicons/icons';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: true,
    imports: [CommonModule, IonContent, IonButton, IonIcon, IonSpinner],
})
export class LoginPage implements OnInit {
    isLoading = false;

    constructor(private router: Router) {
        addIcons({
            logoGoogle,
        });
    }

    ngOnInit() {
        // Inicialización si es necesaria
    }

    loginWithGoogle() {
        this.isLoading = true;
        // Aquí iría la lógica de autenticación con Google
        setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/home']);
        }, 1500);
    }
}
