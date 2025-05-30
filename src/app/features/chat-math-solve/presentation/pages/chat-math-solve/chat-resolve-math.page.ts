import { Component, CUSTOM_ELEMENTS_SCHEMA, viewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MESSAGES_STATE } from '@features/chat-math-solve/application/states/chat-math.state';
import { TypingLoadingComponent } from '@shared/components/typing-loading/typing-loading.component';
import { ChatService } from '@features/chat-math-solve/application/services/chat.service';
import { Inject } from '@angular/core';
import { StateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { MessageState } from '@features/chat-math-solve/application/states/interfaces/chat-math.state.interface';
import { Message } from '@features/chat-math-solve/domain/entities/message.entity';
import { v4 as uuidv4 } from 'uuid';
import { ChatListComponent } from '../../components/chat-list/chat-list.component';

@Component({
    selector: 'app-chat-resolve-math',
    templateUrl: './chat-resolve-math.page.html',
    styleUrls: ['./chat-resolve-math.page.scss'],
    standalone: true,
    imports: [CommonModule, IonContent, HeaderComponent, FooterComponent, TypingLoadingComponent, ChatListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ChatResolveMathPage {
    area = viewChild<IonContent>(IonContent);

    messages = this._messagesState.$state;
    isLoading = signal<boolean>(false);

    constructor(
        @Inject(MESSAGES_STATE) private _messagesState: StateStorage<Array<MessageState>>,
        private readonly _chatService: ChatService
    ) {
        this._messagesState.save([
            ...(this._messagesState.$state() ?? []),
            {
                id: uuidv4(),
                role: 'ai',
                content: '¡Hola! Soy tu asistente EduAiTutor. Envíame tu ejercicio y te ayudo paso a paso. 😊',
            },
        ]);
    }

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
