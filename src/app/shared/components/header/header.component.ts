import { Component, input, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonImg } from '@ionic/angular/standalone';
import { IStateRegister } from '@shared/storage/interfaces/state-register.interface';
import { STATE_REGISTER_TOKEN } from '@shared/storage/providers/storage.provider';
import { Router } from '@angular/router';
import { CreditsCounterComponent } from '../credits-counter/credits-counter.component';

@Component({
    selector: 'app-header',
    template: `
        <ion-header class="header">
            <ion-toolbar class="header__toolbar">
                @if (showBackButton()) {
                <ion-buttons slot="start">
                    <ion-back-button class="header__back-button" defaultHref="/home"></ion-back-button>
                </ion-buttons>
                }
                <div class="header__wrapper">
                    <div class="header__brand">
                        <ion-img src="assets/eduaitutor-bot.png" alt="eduai-tutor-bot"></ion-img>
                        <ion-title class="header__title">{{ title() }}</ion-title>
                    </div>
                    @if (showCredits()) {
                    <div class="header__credits">
                        <app-credits-counter></app-credits-counter>
                    </div>
                    }
                </div>
                <!-- <ion-buttons slot="end">
                    <ion-button (click)="logout()">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </ion-button>
                </ion-buttons> -->
            </ion-toolbar>
        </ion-header>
    `,
    styleUrls: ['./header.component.scss'],
    imports: [IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonImg, CreditsCounterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    title = input.required<string>();
    showBackButton = input.required<boolean>({ alias: 'show-back-button' });
    showCredits = input<boolean>(false, { alias: 'show-credits' });

    constructor(@Inject(STATE_REGISTER_TOKEN) private register: IStateRegister, private router: Router) {}

    async logout() {
        await this.register.clearAll();
        this.router.navigate(['/auth']);
    }
}
