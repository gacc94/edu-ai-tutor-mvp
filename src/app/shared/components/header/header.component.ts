import { Component, input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';

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
                <ion-title class="header__title">{{ title() }}</ion-title>
            </ion-toolbar>
        </ion-header>
    `,
    styleUrls: ['./header.component.scss'],
    imports: [IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
    title = input.required<string>();
    showBackButton = input.required<boolean>();
}
