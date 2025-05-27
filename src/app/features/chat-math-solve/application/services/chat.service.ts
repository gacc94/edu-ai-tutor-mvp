import { Injectable, InjectionToken } from '@angular/core';
import { SendMessageUseCase } from '@features/chat-math-solve/application/uses-cases/send-message.use-case';
import { Message } from '@features/chat-math-solve/domain/entities/message.entity';

@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private readonly _sendMessageUseCase: SendMessageUseCase) {}

    sendMessage(message: Message) {
        this._sendMessageUseCase.execute(message);
    }
}
