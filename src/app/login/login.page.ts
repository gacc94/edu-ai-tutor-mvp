import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonFooter,
    IonText,
    AnimationController,
    IonImg,
    IonSpinner,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
    logoGoogle,
    mailOutline,
    lockClosedOutline,
    personOutline,
    eyeOutline,
    eyeOffOutline,
} from 'ionicons/icons';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: true,
    imports: [
        IonSpinner,
        CommonModule,
        ReactiveFormsModule,
        IonContent,
        IonItem,
        IonInput,
        IonButton,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonIcon,
        IonText,
    ],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
    isRegistering = false;
    isLoading = false;
    showPassword = false;
    showConfirmPassword = false;
    passwordMismatch = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private animationCtrl: AnimationController
    ) {
        addIcons({
            logoGoogle,
            mailOutline,
            lockClosedOutline,
            personOutline,
            eyeOutline,
            eyeOffOutline,
        });
    }

    ngOnInit() {
        // Ya está inicializado, pero podríamos hacer algo más aquí si es necesario
    }

    toggleRegistration() {
        this.isRegistering = !this.isRegistering;
        this.showPassword = false;
        this.showConfirmPassword = false;

        if (this.isRegistering) {
            this.loginForm = this.formBuilder.group(
                {
                    name: ['', Validators.required],
                    email: ['', [Validators.required, Validators.email]],
                    password: [
                        '',
                        [Validators.required, Validators.minLength(6)],
                    ],
                    confirmPassword: ['', Validators.required],
                },
                {
                    validators: this.checkPasswords,
                }
            );
        } else {
            this.loginForm = this.formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
            });
        }
    }

    checkPasswords(group: FormGroup) {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;

        return password === confirmPassword ? null : { passwordMismatch: true };
    }

    onSubmit() {
        if (this.loginForm.valid) {
            // Comprobar si las contraseñas coinciden en caso de registro
            if (this.isRegistering) {
                const password = this.loginForm.get('password')?.value;
                const confirmPassword =
                    this.loginForm.get('confirmPassword')?.value;

                if (password !== confirmPassword) {
                    this.passwordMismatch = true;
                    return;
                }
            }

            this.isLoading = true;
            // Aquí iría la lógica de autenticación real
            setTimeout(() => {
                this.isLoading = false;
                this.router.navigate(['/home']);
            }, 1500);
        } else {
            Object.keys(this.loginForm.controls).forEach((key) => {
                const control = this.loginForm.get(key);
                if (control) {
                    control.markAsTouched();
                }
            });
        }
    }

    loginWithGoogle() {
        this.isLoading = true;
        // Aquí iría la lógica de autenticación con Google
        setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/home']);
        }, 1500);
    }

    forgotPassword() {
        // Implementar lógica para recuperar contraseña
        console.log('Recuperar contraseña');
        // Aquí podría mostrarse un modal, navegar a otra página o enviar un correo de recuperación
    }

    get formControls() {
        return this.loginForm.controls;
    }
}
