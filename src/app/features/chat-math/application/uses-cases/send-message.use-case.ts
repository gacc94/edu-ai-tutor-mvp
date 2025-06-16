import { Injectable, Inject } from '@angular/core';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { MessageFactory } from '@features/chat-math/domain/factories/message.factory';
import { ChatRepository } from '@features/chat-math/domain/repositories/chat.repository';
import { HTTP_CHAT_REPOSITORY } from '@features/chat-math/infrastructure/providers/provider';
import { MESSAGES_STATE } from '@features/chat-math/application/states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { MessageState } from '../states/interfaces/message.state';
import { MessageStateAdapter } from '../adapters/message-state.adapter';

@Injectable({ providedIn: 'root' })
export class SendMessageUseCase {
    constructor(
        @Inject(HTTP_CHAT_REPOSITORY) private _repository: ChatRepository,
        @Inject(MESSAGES_STATE) private _messagesState: IStateStorage<MessageState[]>
    ) {}

    async execute(message: Message): Promise<void> {
        const response = await this._repository.sendMessage(message);

        const aiMessage = MessageFactory.createAiMessage(response);

        const messageState = MessageStateAdapter.adapt(aiMessage);

        const messages = this._messagesState.$state() ?? [];

        await this._messagesState.save([...messages, messageState]);
    }
}
