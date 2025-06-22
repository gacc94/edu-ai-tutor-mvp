import { Component, signal } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TEXT_CHAT_WELCOME } from '@shared/utils/constants/';

@Component({
    selector: 'app-chat-welcome',
    template: `
        <ion-card class="chat__welcome">
            <ion-card-content>
                <p>{{ textChatWelcome() }}</p>
            </ion-card-content>
        </ion-card>
    `,
    styleUrls: ['./chat-welcome.component.scss'],
    imports: [IonCard, IonCardContent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatWelcomeComponent {
    textChatWelcome = signal(TEXT_CHAT_WELCOME);
}
