import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon } from '@ionic/angular/standalone';

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.scss'],
    template: `
        <ion-header class="header">
            <ion-toolbar class="header__toolbar">
                <ion-title class="header__title">
                    <span class="header__title-text">EduAITutor</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
    `,
    imports: [IonHeader, IonToolbar, IonTitle, IonIcon],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
    constructor() {}
}
