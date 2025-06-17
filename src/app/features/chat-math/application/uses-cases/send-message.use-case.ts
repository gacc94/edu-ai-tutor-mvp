import { Injectable, Inject } from '@angular/core';
import { MessageFactory } from '@features/chat-math/domain/factories/message.factory';
import { ChatRepository } from '@features/chat-math/domain/repositories/chat.repository';
import { HTTP_CHAT_REPOSITORY } from '@features/chat-math/infrastructure/providers/provider';
import { MESSAGES_STATE } from '@features/chat-math/application/states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { MessageMapper } from '../mappers/message.mapper';
import { MessageState } from '../states/interfaces';

@Injectable({ providedIn: 'root' })
export class SendMessageUseCase {
    constructor(
        @Inject(HTTP_CHAT_REPOSITORY) private _repository: ChatRepository,
        @Inject(MESSAGES_STATE) private _messagesState: IStateStorage<MessageState[]>
    ) {}

    async execute(message: Message): Promise<void> {
        const response = await this._repository.sendMessage(message);

        const aiMessage = MessageFactory.createAiMessage(response);

        const aiMessageState = MessageMapper.toState(aiMessage);

        await this._messagesState.save([...(this._messagesState.$state() ?? []), aiMessageState]);
    }
}
