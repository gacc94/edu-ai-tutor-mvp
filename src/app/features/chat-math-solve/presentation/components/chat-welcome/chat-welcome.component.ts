import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TEXT_CHAT_WELCOME } from '@shared/utils/constants/contant';

@Component({
    selector: 'app-chat-welcome',
    template: `
        <ion-item class="chat__welcome">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Chat</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p>{{ textChatWelcome }}</p>
                </ion-card-content>
            </ion-card>
        </ion-item>
    `,
    styleUrls: ['./chat-welcome.component.scss'],
    imports: [IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWelcomeComponent {
    textChatWelcome = TEXT_CHAT_WELCOME;
    constructor() {}
}
