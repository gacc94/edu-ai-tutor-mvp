import { Component, Inject } from '@angular/core';
import { IonList } from '@ionic/angular/standalone';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { ChatItemComponent } from '../chat-item/chat-item.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MESSAGES_STATE } from '@features/chat-math/application/states/states';
import { MessageState } from '@features/chat-math/application/states/interfaces/message.state';

@Component({
    selector: 'app-chat-list',
    template: `
        <ion-list class="chat__list" lines="none">
            @for (message of $messages(); track $index) {
            <app-chat-item [message]="message"></app-chat-item>
            }
        </ion-list>
    `,
    styleUrls: ['./chat-list.component.scss'],
    imports: [IonList, ChatItemComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatListComponent {
    $messages = this._messagesState.$state;

    constructor(@Inject(MESSAGES_STATE) private _messagesState: IStateStorage<Array<MessageState>>) {}
}
