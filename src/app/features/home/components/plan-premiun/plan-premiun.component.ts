import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

@Component({
    selector: 'app-plan-premiun',
    template: `
        <section class="premium-plan">
            <div class="premium-plan__content">
                <div class="premium-plan__text">
                    <h2 class="premium-plan__title">Plan Premium</h2>
                    <p class="premium-plan__description">Desbloquea tu chatbot de IA y obtén todas las funciones premium.</p>
                    <ion-button class="premium-plan__button" fill="solid" (click)="navigateToPremium()"> Mejorar Plan </ion-button>
                </div>
                <div class="premium-plan__image-container">
                    <img src="assets/eduaitutor-bot.png" alt="Bot de IA" class="premium-plan__image" />
                </div>
            </div>
        </section>
    `,
    styleUrls: ['./plan-premiun.component.scss'],
    imports: [IonButton],
    standalone: true,
})
export class PlanPremiunComponent {
    constructor(private router: Router) {}

    navigateToPremium(): void {
        this.router.navigate(['/premium']);
    }
}
