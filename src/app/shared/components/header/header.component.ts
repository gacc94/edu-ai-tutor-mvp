import { Component, input } from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
} from '@ionic/angular/standalone';
import { CreditsCounterComponent } from '../credits-counter/credits-counter.component';

@Component({
    selector: 'app-header',
    template: `
        <ion-header [translucent]="true" class="header">
            <ion-toolbar class="header__toolbar">
                <ion-buttons slot="start" class="header__buttons">
                    @if (showBackButton()) {
                    <ion-back-button class="header__back-button" defaultHref="/" [text]="''">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </ion-back-button>
                    }
                </ion-buttons>

                <ion-title class="header__title">
                    <div class="header__title-content">
                        <span class="header__title-text">{{ title() }}</span>
                        @if (showSubtitle()) {
                        <span class="header__subtitle">{{ subtitle() }}</span>
                        }
                    </div>
                </ion-title>

                <ion-buttons slot="end" class="header__buttons">
                    @if (showCredits()) {
                    <app-credits-counter class="header__credits"></app-credits-counter>
                    } @if (showMenuButton()) {
                    <ion-button fill="clear" class="header__menu-button" (click)="onMenuClick()">
                        <ion-icon name="menu-outline"></ion-icon>
                    </ion-button>
                    }
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
    `,
    styleUrls: ['./header.component.scss'],
    imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonBackButton, CreditsCounterComponent],
    standalone: true,
})
export class HeaderComponent {
    title = input<string>('EduAI Tutor');
    subtitle = input<string>('');
    showBackButton = input<boolean>(false);
    showMenuButton = input<boolean>(true);
    showCredits = input<boolean>(true);
    showSubtitle = input<boolean>(false);

    onMenuClick(): void {
        // Implementar lógica del menú si es necesario
        console.log('Menu clicked');
    }
}
