import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, computed, inject } from '@angular/core';
import { IonButton, IonIcon, IonBadge, IonProgressBar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/application/services/auth.service';
import { USER_STATE } from '@core/auth/application/states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState } from '@core/auth/application/states/interfaces/user.state';
import { CreditsService } from '@features/chat-math/application/services/credits.service';

@Component({
    selector: 'app-credits-counter',
    template: `
        <div
            class="credits-counter"
            [class.credits-counter--low]="isLowCredits()"
            [class.credits-counter--empty]="isEmpty()"
        >
            <div class="credits-counter__wrapper" (click)="handleClick()">
                <div class="credits-counter__icon-container">
                    <ion-icon
                        name="diamond"
                        class="credits-counter__icon"
                        [class.credits-counter__icon--pulse]="isLowCredits()"
                    ></ion-icon>
                    @if (showBadge()) {
                    <ion-badge class="credits-counter__badge" [color]="badgeColor()">
                        {{ currentCredits() }}
                    </ion-badge>
                    }
                </div>
                <div class="credits-counter__info">
                    <span class="credits-counter__text">Créditos</span>
                    <div class="credits-counter__progress-container">
                        <ion-progress-bar
                            [value]="progressValue()"
                            [color]="progressColor()"
                            class="credits-counter__progress"
                        ></ion-progress-bar>
                        <span class="credits-counter__count">{{ currentCredits() }}/{{ maxCredits() }}</span>
                    </div>
                </div>
            </div>
            @if (showResetButton() && isEmpty()) {
            <ion-button fill="clear" size="small" class="credits-counter__reset" (click)="resetCredits()">
                <ion-icon name="refresh-outline" slot="icon-only"></ion-icon>
            </ion-button>
            }
        </div>
    `,
    // styleUrls: ['./credits-counter.component.scss'],
    imports: [IonButton, IonIcon, IonBadge, IonProgressBar, CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreditsCounterComponent implements OnInit {
    private readonly _authService = inject(AuthService);
    private readonly _userState = inject(USER_STATE);
    private readonly _creditsService = inject(CreditsService);

    // Signals
    private readonly _userStateSignal = this._userState.$state;

    // Computed values
    currentCredits = computed(() => {
        const user = this._userStateSignal();
        return user?.credits ?? 10;
    });

    maxCredits = computed(() => {
        const user = this._userStateSignal();
        return user?.maxCredits ?? 10;
    });

    progressValue = computed(() => {
        const current = this.currentCredits();
        const max = this.maxCredits();
        return max > 0 ? current / max : 0;
    });

    progressColor = computed(() => {
        const percentage = this.progressValue() * 100;
        if (percentage <= 20) return 'danger';
        if (percentage <= 50) return 'warning';
        return 'success';
    });

    badgeColor = computed(() => {
        const current = this.currentCredits();
        if (current === 0) return 'danger';
        if (current <= 3) return 'warning';
        return 'primary';
    });

    isLowCredits = computed(() => this.currentCredits() <= 3 && this.currentCredits() > 0);
    isEmpty = computed(() => this.currentCredits() === 0);
    showBadge = computed(() => this.currentCredits() <= 5);
    showResetButton = computed(() => this.isEmpty());

    async ngOnInit() {
        // Initialize credits
        await this._creditsService.getCredits();
    }

    handleClick() {
        // Could open a modal with credit information or purchase options
        console.log('Credits clicked - could show credit details');
    }

    async resetCredits() {
        try {
            await this._creditsService.resetCredits();
        } catch (error) {
            console.error('Error resetting credits:', error);
        }
    }
}
