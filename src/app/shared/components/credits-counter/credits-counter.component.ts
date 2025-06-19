import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, computed, inject, linkedSignal } from '@angular/core';
import { IonButton, IonIcon, IonBadge, IonProgressBar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { CREDITS_STATE } from '@features/chat-math/application/states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { CreditsState } from '@features/chat-math/application/states/interfaces/credits.state';
import { CreditsService } from '@features/chat-math/application/services/credits.service';
import { CreditsMapper } from '@features/chat-math/application/mappers/credits.mapper';

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
    styleUrls: ['./credits-counter.component.scss'],
    imports: [IonButton, IonIcon, IonBadge, IonProgressBar, CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreditsCounterComponent implements OnInit {
    private readonly _creditsState = inject(CREDITS_STATE);
    private readonly _creditsService = inject(CreditsService);

    // Signals
    private readonly _$creditsState = this._creditsState.$state;

    // Computed values
    currentCredits = computed(() => {
        const state = this._$creditsState();
        return state?.current ?? 10;
    });

    maxCredits = computed(() => {
        const state = this._$creditsState();
        return state?.maximum ?? 10;
    });

    progressValue = computed(() => {
        const current = this.currentCredits();
        const max = this.maxCredits();
        return max > 0 ? current / max : 0;
    });

    progressColor = linkedSignal(() => {
        const percentage = this.progressValue() * 100;
        if (percentage <= 20) return 'danger';
        if (percentage <= 50) return 'warning';
        return 'success';
    });

    badgeColor = linkedSignal(() => {
        const current = this.currentCredits();
        if (current === 0) return 'danger';
        if (current <= 3) return 'warning';
        return 'primary';
    });

    isLowCredits = linkedSignal(() => this.currentCredits() <= 3 && this.currentCredits() > 0);
    isEmpty = linkedSignal(() => this.currentCredits() === 0);
    showBadge = linkedSignal(() => this.currentCredits() <= 5);
    showResetButton = linkedSignal(() => this.isEmpty());

    async ngOnInit() {
        // Initialize credits if not present
        await this._creditsService.getCredits();
        console.log('Credits initialized:', this.currentCredits());
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
