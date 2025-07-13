import { Component, inject, linkedSignal } from '@angular/core';
import { IonProgressBar, IonButton, IonBadge, IonIcon } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { USER_STATE } from '@core/auth/infrastructure/providers/providers';
import { CommonModule } from '@angular/common';

type ProgressBarColor = 'success' | 'warning' | 'danger' | 'dark';
type BadgeColor = 'success' | 'warning' | 'danger' | 'primary' | 'secondary';

@Component({
    selector: 'app-credits-counter',
    template: `
        <div class="credits" [class.credits--low]="$isLowCredits()" [class.credits--empty]="$isEmptyCredits()">
            <div class="credits__wrapper" (click)="onClick()">
                <div class="credits__icon--container">
                    <ion-icon name="diamond" class="credits__icon"></ion-icon>
                    @if ($showBadge()) {
                    <ion-badge class="credits__badge" [color]="$badgeColor()">{{ $currentCredits() }}</ion-badge>
                    }
                </div>

                <div class="credits__info">
                    <span class="credits__text">Créditos</span>
                    <div class="credits__progress-container">
                        <ion-progress-bar
                            [value]="$progressValue()"
                            [max]="$maxCredits()"
                            [color]="$progressColor()"
                            [mode]="'determinate'"
                            class="credits__progress"
                        ></ion-progress-bar>
                        <span class="credits__count">{{ $currentCredits() }}/{{ $maxCredits() }}</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [IonProgressBar, IonButton, IonIcon, IonBadge, CommonModule],
    styleUrls: ['./credits-counter.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreditsCounterComponent {
    userState = inject(USER_STATE);

    private readonly $state = this.userState.$state;

    $currentCredits = linkedSignal(() => this.$state()?.credits.current ?? 0);
    $maxCredits = linkedSignal(() => this.$state()?.credits.max ?? 0);

    $progressValue = linkedSignal(() => {
        const current = this.$currentCredits();
        const max = this.$maxCredits();
        return max > 0 ? current / max : 0;
    });

    $progressColor = linkedSignal((): ProgressBarColor => {
        const percentage = this.$progressValue() * 100;
        return percentage <= 20 ? 'danger' : percentage <= 50 ? 'warning' : 'success';
    });

    $isLowCredits = linkedSignal(() => this.$progressValue() * 100 <= 50);

    $isEmptyCredits = linkedSignal(() => this.$progressValue() * 100 <= 20);

    $badgeColor = linkedSignal((): BadgeColor => {
        const percentage = this.$progressValue() * 100;
        return percentage <= 20 ? 'danger' : percentage <= 50 ? 'warning' : 'primary';
    });

    $showBadge = linkedSignal(() => this.$progressValue() * 100 <= 50);

    onClick() {
        console.log('show modal with premiun');
    }
}
