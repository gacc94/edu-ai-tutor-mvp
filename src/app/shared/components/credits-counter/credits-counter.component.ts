import { Component, computed, signal, OnInit } from '@angular/core';
import { IonIcon, IonButton, IonBadge } from '@ionic/angular/standalone';
import { CreditsService } from '@shared/services/credits.service';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-credits-counter',
    template: `
        <div
            class="credits-counter"
            [ngClass]="{
                'credits-counter--low': creditsService.$isLowCredits(),
                'credits-counter--empty': !creditsService.$hasCredits()
            }"
        >
            <ion-button
                fill="clear"
                size="small"
                class="credits-counter__button"
                (click)="showCreditsInfo()"
                [disabled]="creditsService.$isLoading()"
            >
                <div class="credits-counter__content">
                    <ion-icon
                        name="diamond-outline"
                        class="credits-counter__icon"
                        [ngClass]="{
                            'credits-counter__icon--pulse': creditsService.$isLowCredits()
                        }"
                    ></ion-icon>
                    <span class="credits-counter__text">
                        {{ creditsService.$currentCredits() }}
                    </span>
                </div>

                <!-- Progress bar -->
                <div class="credits-counter__progress">
                    <div
                        class="credits-counter__progress-fill"
                        [style.width.%]="creditsService.$creditsPercentage()"
                    ></div>
                </div>
            </ion-button>

            <!-- Low credits badge -->
            @if (creditsService.$isLowCredits() && creditsService.$hasCredits()) {
            <ion-badge class="credits-counter__badge" color="warning"> ¡Pocos! </ion-badge>
            }

            <!-- Empty credits badge -->
            <ion-badge class="credits-counter__badge" color="danger"> Sin créditos </ion-badge>
        </div>
    `,
    styleUrls: ['./credits-counter.component.scss'],
    imports: [IonIcon, IonButton, IonBadge, CommonModule],
    standalone: true,
})
export class CreditsCounterComponent implements OnInit {
    constructor(public creditsService: CreditsService, private ionicUtils: IonicUtilsService) {}

    ngOnInit(): void {
        // Load credits from storage on component init
        this.creditsService.loadCreditsFromStorage();
    }

    async showCreditsInfo(): Promise<void> {
        const credits = this.creditsService.$currentCredits();
        const maxCredits = this.creditsService.$maxCredits();
        const percentage = this.creditsService.$creditsPercentage();

        // await this.ionicUtils.presentAlert({
        //     header: '💎 Tus Créditos',
        //     message: `
        //         <div style="text-align: center; padding: 1rem;">
        //             <h3 style="color: var(--color-primary); margin-bottom: 1rem;">
        //                 ${credits} / ${maxCredits} créditos
        //             </h3>
        //             <div style="background: var(--color-bg-light); border-radius: 8px; height: 8px; margin: 1rem 0;">
        //                 <div style="background: var(--color-primary); height: 100%; width: ${percentage}%; border-radius: 8px; transition: width 0.3s ease;"></div>
        //             </div>
        //             <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-top: 1rem;">
        //                 Cada pregunta consume 1 crédito. ¡Úsalos sabiamente para obtener las mejores respuestas!
        //             </p>
        //             ${
        //                 credits <= 3
        //                     ? '<p style="color: var(--color-accent); font-weight: 600; margin-top: 0.5rem;">⚠️ Te quedan pocos créditos</p>'
        //                     : ''
        //             }
        //         </div>
        //     `,
        //     buttons: [
        //         {
        //             text: 'Entendido',
        //             role: 'confirm',
        //         },
        //         ...(credits === 0
        //             ? [
        //                   {
        //                       text: 'Reiniciar Créditos',
        //                       handler: () => {
        //                           this.creditsService.resetCredits();
        //                           this.ionicUtils.presentToast({
        //                               message: '¡Créditos reiniciados! 🎉',
        //                               duration: 2000,
        //                               color: 'success',
        //                           });
        //                       },
        //                   },
        //               ]
        //             : []),
        //     ],
        // });
    }
}
