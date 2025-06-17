import { Injectable, inject } from '@angular/core';
import { MessageFactory } from '@features/chat-math/domain/factories/message.factory';
import { IMAGES_SELECTED_STATE, MESSAGES_STATE } from '@features/chat-math/application/states/states';
import { IMAGES_SELECTED_AS_FILES_STATE } from '@features/chat-math/application/states/states';
import { ImageMapper } from '../mappers/image.mapper';
import { MessageMapper } from '../mappers/message.mapper';
import { Message } from '@features/chat-math/domain/entities/message.entity';

@Injectable({ providedIn: 'root' })
export class PrepareSendingMessageUseCase {
    private readonly _messagesState = inject(MESSAGES_STATE);
    private readonly _imagesSelectedAsFilesState = inject(IMAGES_SELECTED_AS_FILES_STATE);
    private readonly _imagesSelectedState = inject(IMAGES_SELECTED_STATE);

    async execute(content: string): Promise<Message> {
        const imagesState = this._imagesSelectedState.$state() ?? [];
        const messagesState = this._messagesState.$state() ?? [];

        const images = imagesState.map((image) => ImageMapper.toDomain(image));
        const files = await ImageMapper.toFiles(images);

        const userMessage = MessageFactory.createUserMessage(content, images);
        const userMessageState = MessageMapper.toState(userMessage);

        this._messagesState.save([...messagesState, userMessageState]);
        this._imagesSelectedAsFilesState.save(files);

        return userMessage;
    }
}
