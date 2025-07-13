import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonToggle,
    IonItem,
    IonLabel,
    IonBadge,
    IonSpinner,
    IonCheckbox,
} from '@ionic/angular/standalone';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { SubscriptionService } from '@features/subscription/application/services/subscription.service';

@Component({
    selector: 'app-premium',
    template: `
        <!-- <ion-header class="premium__header" [translucent]="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/home" text=""></ion-back-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-button fill="clear" (click)="closePage()">
                        <ion-icon name="close" slot="icon-only"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header> -->

        <ion-content class="premium" [fullscreen]="true" [scrollEvents]="true">
            <!-- Hero Section - Optimized for mobile -->
            <div class="premium__hero">
                <div class="premium__hero-content">
                    <div class="premium__logo-container">
                        <img src="assets/eduaitutor-bot.png" alt="EduAI Tutor Bot" class="premium__logo" />
                    </div>
                    <h1 class="premium__title">{{ selectedPlan()?.name || 'Tutor AI Pro' }}</h1>
                    <p class="premium__subtitle">Achieve your academic goals with AI</p>

                    <!-- Mobile-optimized Stats -->
                    <div class="premium__stats">
                        <div class="premium__stat">
                            <ion-icon name="star" class="premium__stat-icon"></ion-icon>
                            <div class="premium__stat-content">
                                <span class="premium__stat-number">4.8 Stars</span>
                                <span class="premium__stat-label">from 1k+ students</span>
                            </div>
                        </div>
                        <div class="premium__stat">
                            <ion-icon name="checkmark-circle" class="premium__stat-icon"></ion-icon>
                            <div class="premium__stat-content">
                                <span class="premium__stat-number">10M+</span>
                                <span class="premium__stat-label">Problems Solved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Section - Mobile Cards -->
            <div class="premium__features">
                <h3 class="premium__features-title">¿Qué incluye?</h3>
                <div class="premium__features-grid">
                    @for (feature of features(); track $index) {
                    <div class="premium__feature-card">
                        <div class="premium__feature-icon">
                            <ion-icon name="checkmark-circle"></ion-icon>
                        </div>
                        <span class="premium__feature-text">{{ feature }}</span>
                    </div>
                    }
                </div>
            </div>

            <!-- Plans Section - Mobile Optimized -->
            <div class="premium__plans">
                <h3 class="premium__plans-title">Elige tu plan</h3>
                @for (plan of subscriptionService.plans(); track plan.id) {
                <div
                    class="premium__plan"
                    [class.premium__plan--selected]="selectedPlan()?.id === plan.id"
                    [class.premium__plan--popular]="plan.isPopular"
                    (click)="selectPlan(plan.id)"
                >
                    @if (plan.isPopular) {
                    <div class="premium__plan-badge">
                        <ion-badge color="primary">Más Popular</ion-badge>
                    </div>
                    }

                    <div class="premium__plan-content">
                        <div class="premium__plan-header">
                            <div class="premium__plan-info">
                                <div class="premium__plan-period">{{ plan.isYearly ? 'Anual' : 'Mensual' }}</div>
                                @if (plan.hasDiscount) {
                                <div class="premium__plan-savings">Ahorra {{ plan.discountPercentage }}%</div>
                                }
                            </div>
                            <div class="premium__plan-pricing">
                                <div class="premium__plan-price-container">
                                    <span class="premium__plan-price">{{ plan.formattedPrice }}</span>
                                    <span class="premium__plan-duration">{{ plan.duration }}</span>
                                </div>
                                @if (plan.hasDiscount) {
                                <span class="premium__plan-original-price">{{ plan.formattedOriginalPrice }}</span>
                                }
                            </div>
                        </div>

                        @if (plan.isYearly) {
                        <div class="premium__plan-note">Facturado anualmente</div>
                        }
                    </div>

                    <div class="premium__plan-radio">
                        <ion-checkbox [checked]="selectedPlan()?.id === plan.id" (ionChange)="selectPlan(plan.id)"></ion-checkbox>
                    </div>
                </div>
                }
            </div>

            <!-- Trial Section - Mobile Optimized -->
            @if (selectedPlan()?.trialDays) {
            <div class="premium__trial">
                <div class="premium__trial-card">
                    <div class="premium__trial-content">
                        <div class="premium__trial-info">
                            <h4>{{ selectedPlan()?.trialDays }} días de prueba gratuita</h4>
                            <p>Sin pago ahora. Fácil de cancelar</p>
                        </div>
                        <ion-toggle
                            [checked]="subscriptionService.isTrialEnabled()"
                            (ionChange)="toggleTrial()"
                            color="success"
                        ></ion-toggle>
                    </div>
                    <div class="premium__trial-note">
                        Primeros {{ selectedPlan()?.trialDays }} días gratis, luego {{ selectedPlan()?.formattedPrice
                        }}{{ selectedPlan()?.duration }}, auto renovable
                    </div>
                </div>
            </div>
            }
        </ion-content>

        <!-- Fixed Bottom Action - Mobile Pattern -->
        <div class="premium__bottom-action">
            <div class="premium__action-content">
                <div class="premium__action-info">
                    @if (subscriptionService.isTrialEnabled() && selectedPlan()?.trialDays) {
                    <span class="premium__action-title">Comienza tu prueba gratuita</span>
                    <span class="premium__action-subtitle">{{ selectedPlan()?.trialDays }} días gratis</span>
                    } @else {
                    <span class="premium__action-title">{{ selectedPlan()?.formattedPrice }}{{ selectedPlan()?.duration }}</span>
                    <span class="premium__action-subtitle">Acceso completo</span>
                    }
                </div>
                <ion-button
                    class="premium__cta-button"
                    [disabled]="subscriptionService.isLoading()"
                    (click)="handleSubscription()"
                    size="large"
                >
                    @if (subscriptionService.isLoading()) {
                    <ion-spinner name="dots"></ion-spinner>
                    } @else { @if (subscriptionService.isTrialEnabled() && selectedPlan()?.trialDays) { Prueba gratis } @else { Suscribirse
                    } }
                </ion-button>
            </div>

            <div class="premium__footer-links">
                <button class="premium__link" (click)="cancelAnytime()">
                    <ion-icon name="time-outline"></ion-icon>
                    Cancela cuando quieras
                </button>
                <button class="premium__link" (click)="restorePurchase()">
                    <ion-icon name="refresh-outline"></ion-icon>
                    Restaurar compra
                </button>
            </div>
        </div>
    `,
    styleUrls: ['./premium.page.scss'],
    imports: [
        CommonModule,
        IonContent,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonButton,
        IonIcon,
        IonToggle,
        IonItem,
        IonLabel,
        IonBadge,
        IonSpinner,
        IonCheckbox,
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

    features = signal(['Tutores AI ilimitados', 'Chat ilimitado con tu AI Tutor', 'Sin anuncios', 'Acceso a todas las funciones premium']);

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
                await this._showSuccessMessage('¡Prueba gratuita activada!');
            } else {
                await this.subscriptionService.subscribeToPlan(plan.id);
                await this._showSuccessMessage('¡Suscripción activada!');
            }

            this._router.navigate(['/home']);
        } catch (error) {
            await this._ionicUtils.presentToast({
                message: 'Error al procesar la suscripción. Inténtalo de nuevo.',
                duration: 3000,
                color: 'danger',
                position: 'top',
            });
        }
    }

    async cancelAnytime(): Promise<void> {
        await this._ionicUtils.presentToast({
            message: 'Puedes cancelar tu suscripción en cualquier momento desde la configuración.',
            duration: 3000,
            color: 'medium',
        });
    }

    async restorePurchase(): Promise<void> {
        await this._ionicUtils.presentToast({
            message: 'Restaurando compras...',
            duration: 2000,
            color: 'primary',
        });
    }

    closePage(): void {
        this._router.navigate(['/home']);
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
