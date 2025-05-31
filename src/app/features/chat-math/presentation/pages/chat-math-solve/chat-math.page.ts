import { Component, CUSTOM_ELEMENTS_SCHEMA, viewChild, signal, linkedSignal } from '@angular/core';

import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MESSAGES_STATE } from '@features/chat-math/application/states/chat-math.state';
import { TypingLoadingComponent } from '@shared/components/typing-loading/typing-loading.component';
import { ChatService } from '@features/chat-math/application/services/chat.service';
import { Inject } from '@angular/core';
import { StateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { MessageState } from '@features/chat-math/application/states/interfaces/chat-math.state.interface';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { ChatListComponent } from '../../components/chat-list/chat-list.component';
import { ChatWelcomeComponent } from '../../components/chat-welcome/chat-welcome.component';

@Component({
    selector: 'app-chat-math',
    template: `
        <app-header title="Ai Assistant" [showBackButton]="true"></app-header>

        <ion-content [fullscreen]="true">
            @if ($messageLength() === 0) {
            <app-chat-welcome></app-chat-welcome>
            } @else {
            <app-chat-list></app-chat-list>
            } @if (isLoading()) {
            <app-typing-loading></app-typing-loading>
            }
        </ion-content>

        <app-footer (onSendMessage)="sendMessage($event)"></app-footer>
    `,
    standalone: true,
    imports: [
        IonContent,
        HeaderComponent,
        FooterComponent,
        TypingLoadingComponent,
        ChatListComponent,
        ChatWelcomeComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ChatMathPage {
    area = viewChild<IonContent>(IonContent);

    $messages = this._messagesState.$state;

    $messageLength = linkedSignal(() => this.$messages()?.length ?? 0);

    isLoading = signal<boolean>(false);

    constructor(
        @Inject(MESSAGES_STATE) private _messagesState: StateStorage<Array<MessageState>>,
        private readonly _chatService: ChatService
    ) {}

    async sendMessage(message: Message): Promise<void> {
        this.isLoading.set(true);
        await this.scrollToBottom();

        await this._chatService.sendMessage(message);

        this.isLoading.set(false);
        await this.scrollToBottom();
    }

    private scrollToBottom(): Promise<void> | undefined {
        return this.area()?.scrollToBottom(300);
    }
}
