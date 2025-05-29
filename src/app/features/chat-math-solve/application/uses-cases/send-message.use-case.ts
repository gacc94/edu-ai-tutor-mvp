import { Injectable, Inject } from '@angular/core';
import { Message } from '@features/chat-math-solve/domain/entities/message.entity';
import { MessageFactory } from '@features/chat-math-solve/domain/factories/message.factory';
import { ChatRepository } from '@features/chat-math-solve/domain/repositories/chat.repository';
import { HTTP_CHAT_REPOSITORY } from '@features/chat-math-solve/infrastructure/providers/provider';
import { MESSAGES_STATE } from '@features/chat-math-solve/application/states/chat-math.state';
import { StateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { MessageState } from '../states/interfaces/chat-math.state.interface';

@Injectable({ providedIn: 'root' })
export class SendMessageUseCase {
    constructor(
        @Inject(HTTP_CHAT_REPOSITORY) private _repository: ChatRepository,
        @Inject(MESSAGES_STATE) private _messagesState: StateStorage<Array<MessageState>>
    ) {}

    async execute(message: Message) {
        const response = await this._repository.sendMessage(message);

        const aiMessage = MessageFactory.createAiMessage(response);

        this._messagesState.save([...(this._messagesState.$state() ?? []), aiMessage]);

        return aiMessage;
    }
}
