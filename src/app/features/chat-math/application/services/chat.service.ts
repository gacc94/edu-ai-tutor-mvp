import { Injectable } from '@angular/core';
import { SendMessageUseCase } from '@features/chat-math/application/uses-cases/send-message.use-case';
import { Message } from '@features/chat-math/domain/entities/message.entity';

@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private readonly _sendMessageUseCase: SendMessageUseCase) {}

    sendMessage(message: Message): Promise<void> {
        return this._sendMessageUseCase.execute(message);
    }
}
