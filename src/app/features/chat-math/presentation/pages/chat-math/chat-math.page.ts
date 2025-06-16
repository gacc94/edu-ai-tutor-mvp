import { Component, CUSTOM_ELEMENTS_SCHEMA, viewChild, signal, linkedSignal } from '@angular/core';
import { AfterViewInit } from '@angular/core';

import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MESSAGES_STATE } from '@features/chat-math/application/states/states';
import { TypingLoadingComponent } from '@shared/components/typing-loading/typing-loading.component';
import { ChatService } from '@features/chat-math/application/services/chat.service';
import { Inject } from '@angular/core';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { MessageState } from '@features/chat-math/application/states/interfaces/message.state';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { ChatListComponent } from '../../components/chat-list/chat-list.component';
import { ChatWelcomeComponent } from '../../components/chat-welcome/chat-welcome.component';

interface ScrollToBottomParams {
    duration?: number;
    delay?: number;
}

@Component({
    selector: 'app-chat-math',
    template: `
        <app-header title="Ai Assistant" [showBackButton]="true"></app-header>

        <ion-content [fullscreen]="true">
            @if ($messageLength() === 0) {
            <app-chat-welcome></app-chat-welcome>
            }
            <app-chat-list></app-chat-list>
            @if (isLoading()) {
            <app-typing-loading></app-typing-loading>
            }
        </ion-content>

        <app-footer (onSendMessage)="sendMessage($event)"></app-footer>
    `,
    styleUrl: './chat-math.page.scss',
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
export default class ChatMathPage implements AfterViewInit {
    area = viewChild<IonContent>(IonContent, { debugName: 'area' });

    $messages = this._messagesState.$state;

    $messageLength = linkedSignal(() => this.$messages()?.length ?? 0);

    isLoading = signal<boolean>(false);

    constructor(
        @Inject(MESSAGES_STATE) private _messagesState: IStateStorage<MessageState[]>,
        private readonly _chatService: ChatService
    ) {}

    /**
     * After view init
     */
    async ngAfterViewInit(): Promise<void> {
        this._scrollToBottom({ duration: 0 });
    }

    /**
     * Sends a message to the chat
     * @param message
     */
    async sendMessage(message: Message): Promise<void> {
        this.isLoading.set(true);
        this._scrollToBottom();

        await this._chatService.sendMessage(message);

        this.isLoading.set(false);
        this._scrollToBottom();
    }

    /**
     * Scrolls to the bottom of the chat list
     * @param scrollToBottomParams
     */
    private _scrollToBottom(scrollToBottomParams?: ScrollToBottomParams) {
        const { duration = 300, delay = 100 } = scrollToBottomParams || {};
        setTimeout(() => this.area()?.scrollToBottom(duration), delay);
    }
}
