import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonToggle, IonSpinner } from '@ionic/angular/standalone';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { SubscriptionService } from '@features/subscription/application/services/subscription.service';

@Component({
    selector: 'app-premium',
    template: `
        <ion-content class="premium" [fullscreen]="true">
            <!-- Close Button -->
            <button class="premium__close" (click)="closePage()" aria-label="Cerrar">
                <ion-icon name="close"></ion-icon>
            </button>

            <div class="premium__container">
                <!-- Hero Section -->
                <div class="premium__hero">
                    <div class="premium__logo">
                        <img src="assets/eduaitutor-bot.png" alt="EduAI Tutor" />
                    </div>
                    <h1 class="premium__title">Tutor AI Pro</h1>
                    <p class="premium__subtitle">Desbloquea todo tu potencial académico</p>
                </div>

                <!-- Benefits -->
                <div class="premium__benefits">
                    @for (benefit of benefits(); track $index) {
                    <div class="premium__benefit">
                        <ion-icon name="checkmark-circle" class="premium__benefit-icon"></ion-icon>
                        <span class="premium__benefit-text">{{ benefit }}</span>
                    </div>
                    }
                </div>

                <!-- Plans -->
                <div class="premium__plans">
                    @for (plan of subscriptionService.plans(); track plan.id) {
                    <div
                        class="premium__plan"
                        [class.premium__plan--selected]="selectedPlan()?.id === plan.id"
                        [class.premium__plan--popular]="plan.isPopular"
                        (click)="selectPlan(plan.id)"
                        [attr.aria-label]="'Plan ' + (plan.isYearly ? 'anual' : 'mensual')"
                    >
                        @if (plan.isPopular) {
                        <div class="premium__plan-badge">Más Popular</div>
                        }

                        <div class="premium__plan-header">
                            <div class="premium__plan-info">
                                <span class="premium__plan-period">{{ plan.isYearly ? 'Anual' : 'Mensual' }}</span>
                                @if (plan.hasDiscount) {
                                <span class="premium__plan-savings">Ahorra {{ plan.discountPercentage }}%</span>
                                }
                            </div>
                            <div class="premium__plan-check">
                                <ion-icon
                                    [name]="selectedPlan()?.id === plan.id ? 'checkmark-circle' : 'ellipse-outline'"
                                    [class.premium__plan-check--selected]="selectedPlan()?.id === plan.id"
                                ></ion-icon>
                            </div>
                        </div>

                        <div class="premium__plan-pricing">
                            <div class="premium__plan-price-main">
                                <span class="premium__plan-price">{{ plan.formattedPrice }}</span>
                                <span class="premium__plan-duration">{{ plan.duration }}</span>
                            </div>
                            @if (plan.hasDiscount) {
                            <span class="premium__plan-original">{{ plan.formattedOriginalPrice }}</span>
                            }
                        </div>

                        @if (plan.isYearly) {
                        <div class="premium__plan-note">Facturado anualmente</div>
                        }
                    </div>
                    }
                </div>

                <!-- Trial Toggle -->
                @if (selectedPlan()?.trialDays) {
                <div class="premium__trial">
                    <div class="premium__trial-main">
                        <div class="premium__trial-info">
                            <span class="premium__trial-title">Prueba {{ selectedPlan()?.trialDays }} días gratis</span>
                            <span class="premium__trial-subtitle">Sin cargo inicial</span>
                        </div>
                        <ion-toggle
                            [checked]="subscriptionService.isTrialEnabled()"
                            (ionChange)="toggleTrial()"
                            color="success"
                            aria-label="Activar prueba gratuita"
                        ></ion-toggle>
                    </div>
                    @if (subscriptionService.isTrialEnabled()) {
                    <p class="premium__trial-terms">
                        Luego {{ selectedPlan()?.formattedPrice }}{{ selectedPlan()?.duration }}, renovación automática
                    </p>
                    }
                </div>
                }
            </div>

            <!-- Fixed Bottom CTA -->
            <div class="premium__bottom">
                <div class="premium__cta">
                    <ion-button
                        expand="block"
                        class="premium__cta-button"
                        [disabled]="subscriptionService.isLoading()"
                        (click)="handleSubscription()"
                        [attr.aria-label]="getCtaAriaLabel()"
                    >
                        @if (subscriptionService.isLoading()) {
                        <ion-spinner name="dots"></ion-spinner>
                        } @else {
                        <div class="premium__cta-content">
                            @if (subscriptionService.isTrialEnabled() && selectedPlan()?.trialDays) {
                            <span class="premium__cta-main">Prueba {{ selectedPlan()?.trialDays }} días gratis</span>
                            <span class="premium__cta-sub">Luego {{ selectedPlan()?.formattedPrice }}{{ selectedPlan()?.duration }}</span>
                            } @else {
                            <span class="premium__cta-main"
                                >Suscribirse por {{ selectedPlan()?.formattedPrice }}{{ selectedPlan()?.duration }}</span
                            >
                            <span class="premium__cta-sub">Acceso completo inmediato</span>
                            }
                        </div>
                        }
                    </ion-button>
                </div>

                <div class="premium__trust">
                    <button class="premium__trust-item" (click)="showCancelInfo()">
                        <ion-icon name="shield-checkmark-outline"></ion-icon>
                        <span>Cancela cuando quieras</span>
                    </button>
                    <button class="premium__trust-item" (click)="restorePurchase()">
                        <ion-icon name="refresh-outline"></ion-icon>
                        <span>Restaurar compra</span>
                    </button>
                </div>
            </div>
        </ion-content>
    `,
    styleUrls: ['./premium.page.scss'],
    imports: [CommonModule, IonContent, IonButton, IonIcon, IonToggle, IonSpinner],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    standalone: true,
})
export default class PremiumPage {
    protected readonly subscriptionService = inject(SubscriptionService);
    private readonly _router = inject(Router);
    private readonly _ionicUtils = inject(IonicUtilsService);

    selectedPlan = computed(() => {
        const plans = this.subscriptionService.plans();
        return plans.find((p) => p.isPopular) || plans[0] || null;
    });

    benefits = signal([
        'Tutores AI ilimitados',
        'Chat sin límites con tu AI Tutor',
        'Sin anuncios publicitarios',
        'Acceso a todas las funciones premium',
        'Soporte prioritario 24/7',
    ]);

    async selectPlan(planId: string): Promise<void> {
        await this.subscriptionService.selectPlan(planId);
    }

    async toggleTrial(): Promise<void> {
        await this.subscriptionService.toggleTrial();
    }

    async handleSubscription(): Promise<void> {
        try {
            const plan = this.selectedPlan();
            if (!plan) return;

            if (this.subscriptionService.isTrialEnabled() && plan.trialDays) {
                await this.subscriptionService.startFreeTrial();
                await this._showSuccessMessage('¡Prueba gratuita activada exitosamente!');
            } else {
                await this.subscriptionService.subscribeToPlan(plan.id);
                await this._showSuccessMessage('¡Suscripción activada exitosamente!');
            }

            this._router.navigate(['/home']);
        } catch (error) {
            await this._ionicUtils.presentToast({
                message: 'Error al procesar la suscripción. Por favor, inténtalo de nuevo.',
                duration: 3000,
                color: 'danger',
                position: 'top',
            });
        }
    }

    async showCancelInfo(): Promise<void> {
        await this._ionicUtils.presentToast({
            message: 'Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta.',
            duration: 3000,
            color: 'medium',
        });
    }

    async restorePurchase(): Promise<void> {
        await this._ionicUtils.presentToast({
            message: 'Restaurando compras anteriores...',
            duration: 2000,
            color: 'primary',
        });
    }

    closePage(): void {
        this._router.navigate(['/home']);
    }

    getCtaAriaLabel(): string {
        const plan = this.selectedPlan();
        if (!plan) return 'Suscribirse';

        if (this.subscriptionService.isTrialEnabled() && plan.trialDays) {
            return `Iniciar prueba gratuita de ${plan.trialDays} días`;
        }
        return `Suscribirse al plan ${plan.isYearly ? 'anual' : 'mensual'}`;
    }

    private async _showSuccessMessage(message: string): Promise<void> {
        await this._ionicUtils.presentToast({
            message,
            duration: 3000,
            color: 'success',
            position: 'top',
        });
    }
}
