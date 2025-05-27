import { Component, CUSTOM_ELEMENTS_SCHEMA, viewChild, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Photo } from '@capacitor/camera';
import { ChatMathStateService } from '@features/chat-math-solve/application/states/chat-math.state';
import { TypingLoadingComponent } from '@shared/components/typing-loading/typing-loading.component';
import { Message } from '@features/chat-math-solve/domain/entities/message.entity';
import { ChatService } from '@features/chat-math-solve/application/services/chat.service';

@Component({
    selector: 'app-chat-resolve-math',
    templateUrl: './chat-resolve-math.page.html',
    styleUrls: ['./chat-resolve-math.page.scss'],
    standalone: true,
    imports: [CommonModule, IonList, IonItem, IonContent, HeaderComponent, FooterComponent, TypingLoadingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ChatResolveMathPage {
    area = viewChild<IonContent>(IonContent);

    messages = this._chatState.$messages;
    isLoading = this._chatState.$isLoading;

    constructor(private _chatState: ChatMathStateService, private readonly _chatService: ChatService) {}

    async sendMessage(message: Message) {
        await this.scrollToBottom();

        this._chatService.sendMessage(message);
    }

    private scrollToBottom() {
        return this.area()?.scrollToBottom(300);
    }
}
