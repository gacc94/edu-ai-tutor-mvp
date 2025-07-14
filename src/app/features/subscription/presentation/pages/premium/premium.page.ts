import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
    IonContent,
    IonButton,
    IonIcon,
    IonToggle,
    IonSpinner,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonFooter,
    IonToolbar,
    IonItem,
    IonLabel,
    IonBadge,
    IonList,
} from '@ionic/angular/standalone';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { SubscriptionService } from '@features/subscription/application/services/subscription.service';
import { SubscriptionPlan } from '@features/subscription/domain/entities/subscription-plan.entity';

@Component({
    selector: 'app-premium',
    template: `
        <ion-content class="premium" [fullscreen]="true">
            <!-- Close Button -->
            <button class="premium__close" (click)="closePage()" aria-label="Cerrar">
                <ion-icon name="close"></ion-icon>
            </button>

            <!-- Hero Section -->
            <div class="premium__hero">
                <div class="premium__logo">
                    <img src="assets/eduaitutor-bot.png" alt="EduAI Tutor" />
                </div>
                <h1 class="premium__title">EduAiTutor Pro</h1>
                <p class="premium__subtitle">Desbloquea todo tu potencial académico</p>
            </div>

            <!-- Benefits List -->
            <div class="premium__benefits">
                <div class="premium__benefits-grid">
                    @for (benefit of benefits(); track $index) {
                    <div class="premium__benefit">
                        <ion-icon name="checkmark-circle" class="premium__benefit-icon"></ion-icon>
                        <span class="premium__benefit-text">{{ benefit }}</span>
                    </div>
                    }
                </div>
            </div>

            <!-- Plans Cards -->
            <div class="premium__plans">
                @for (plan of subscriptionService.plans(); track plan.id) {
                <ion-card
                    class="premium__plan-card"
                    [class.premium__plan-card--selected]="selectedPlan()?.id === plan.id"
                    [class.premium__plan-card--popular]="plan.isPopular"
                    (click)="selectPlan(plan.id)"
                    button="true"
                >
                    @if (plan.isPopular) {
                    <div class="premium__plan-badge-container">
                        <ion-badge class="premium__plan-badge" color="primary">Más Popular</ion-badge>
                    </div>
                    }

                    <ion-card-header class="premium__plan-header">
                        <div class="premium__plan-info">
                            <ion-card-title class="premium__plan-period">
                                {{ getPlanTitle(plan) }}
                            </ion-card-title>
                            @if (plan.hasDiscount) {
                            <ion-badge class="premium__plan-savings" color="success"> Ahorra {{ plan.discountPercentage }}% </ion-badge>
                            }
                        </div>
                        <div class="premium__plan-check">
                            <ion-icon
                                [name]="selectedPlan()?.id === plan.id ? 'checkmark-circle' : 'ellipse-outline'"
                                [class.premium__plan-check--selected]="selectedPlan()?.id === plan.id"
                            ></ion-icon>
                        </div>
                    </ion-card-header>

                    <ion-card-content class="premium__plan-content">
                        <div class="premium__plan-pricing">
                            <div class="premium__plan-price-main">
                                <span class="premium__plan-price">{{ plan.formattedPrice }}</span>
                                <span class="premium__plan-duration">{{ plan.duration }}</span>
                            </div>
                            @if (plan.hasDiscount) {
                            <span class="premium__plan-original">{{ plan.formattedOriginalPrice }}</span>
                            }
                        </div>
                        <p class="premium__plan-note">{{ getPlanDescription(plan) }}</p>
                    </ion-card-content>
                </ion-card>
                }
            </div>

            <!-- Enhanced Trial Toggle Card -->
            @if (selectedPlan()?.trialDays) {
            <ion-card class="premium__trial-card" [class.premium__trial-card--enabled]="subscriptionService.isTrialEnabled()">
                <ion-card-content class="premium__trial-content">
                    <div class="premium__trial-main">
                        <div class="premium__trial-info">
                            <div class="premium__trial-icon">
                                <ion-icon [name]="subscriptionService.isTrialEnabled() ? 'gift' : 'gift-outline'"></ion-icon>
                            </div>
                            <div class="premium__trial-text">
                                <h3 class="premium__trial-title">
                                    @if (subscriptionService.isTrialEnabled()) { Prueba gratuita habilitada } @else { Prueba
                                    {{ selectedPlan()?.trialDays }} días gratis }
                                </h3>
                                <p class="premium__trial-subtitle">
                                    @if (subscriptionService.isTrialEnabled()) {
                                    {{ selectedPlan()?.trialDays }} días sin costo } @else { Sin cargo inicial }
                                </p>
                            </div>
                        </div>
                        <ion-toggle
                            [checked]="subscriptionService.isTrialEnabled()"
                            (ionChange)="toggleTrial()"
                            color="success"
                            aria-label="Activar prueba gratuita"
                        ></ion-toggle>
                    </div>
                    @if (subscriptionService.isTrialEnabled()) {
                    <div class="premium__trial-terms">
                        <ion-icon name="information-circle-outline"></ion-icon>
                        <span>Luego {{ selectedPlan()?.formattedPrice }}{{ selectedPlan()?.duration }}, renovación automática</span>
                    </div>
                    }
                </ion-card-content>
            </ion-card>
            }

            <!-- Spacer for footer -->
            <div class="premium__spacer"></div>
        </ion-content>

        <!-- Fixed Footer with CTA -->
        <ion-footer class="premium__footer">
            <ion-toolbar class="premium__footer-toolbar">
                <div class="premium__cta-container">
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

                    <div class="premium__trust-links">
                        <ion-button fill="clear" size="small" class="premium__trust-button" (click)="showCancelInfo()">
                            <ion-icon name="shield-checkmark-outline" slot="start"></ion-icon>
                            Cancela cuando quieras
                        </ion-button>
                        <ion-button fill="clear" size="small" class="premium__trust-button" (click)="restorePurchase()">
                            <ion-icon name="refresh-outline" slot="start"></ion-icon>
                            Restaurar compra
                        </ion-button>
                    </div>
                </div>
            </ion-toolbar>
        </ion-footer>
    `,
    styleUrls: ['./premium.page.scss'],
    imports: [
        CommonModule,
        IonContent,
        IonButton,
        IonIcon,
        IonToggle,
        IonSpinner,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonFooter,
        IonToolbar,
        IonItem,
        IonLabel,
        IonBadge,
        IonList,
    ],
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

    getPlanTitle(plan: SubscriptionPlan): string {
        return plan.isYearly ? 'Plan Anual' : 'Plan Mensual';
    }

    getPlanDescription(plan: SubscriptionPlan): string {
        return plan.isYearly ? 'Facturado anualmente' : 'Facturado mensualmente';
    }

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
