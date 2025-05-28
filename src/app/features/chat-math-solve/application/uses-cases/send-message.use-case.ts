import { Injectable, Inject } from '@angular/core';
import { Message } from '@features/chat-math-solve/domain/entities/message.entity';
import { ChatRepository } from '@features/chat-math-solve/domain/repositories/chat.repository';
import { HTTP_CHAT_REPOSITORY } from '@features/chat-math-solve/infrastructure/providers/provider';

@Injectable({ providedIn: 'root' })
export class SendMessageUseCase {
    constructor(@Inject(HTTP_CHAT_REPOSITORY) private _repository: ChatRepository) {}

    execute(message: Message) {
        this._repository.sendMessage(message);
    }
}
