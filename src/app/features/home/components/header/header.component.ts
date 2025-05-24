import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.scss'],
    template: `
        <ion-header class="header" mode="md">
            <ion-toolbar class="header__toolbar">
                <ion-title class="header__title">
                    <span class="header__title-text">EduAITutor</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
    `,
    imports: [IonHeader, IonTitle],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
    constructor() {}
}
