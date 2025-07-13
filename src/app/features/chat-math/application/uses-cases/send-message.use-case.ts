import { HTTP_CHAT_REPOSITORY } from '@features/chat-math/infrastructure/providers/provider';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { inject } from '@angular/core';
import { ChatResult } from '@features/chat-math/domain/interfaces/chat-result';
import { ISendMessageUseCase } from '@features/chat-math/application/interfaces/send-message-use-case';

export class SendMessageUseCase implements ISendMessageUseCase {
    private readonly _repository = inject(HTTP_CHAT_REPOSITORY);

    execute(message: Message, files: File[]): Promise<ChatResult> {
        return this._repository.sendMessage(message, files);
    }
}
