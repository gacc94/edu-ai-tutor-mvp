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
        const images = this._getImages();
        const files = await ImageMapper.toFiles(images);

        const userMessage = MessageFactory.createUserMessage(content, images);
        const userMessageState = MessageMapper.toState(userMessage);

        this._messagesState.save([...(this._messagesState.$state() ?? []), userMessageState]);
        this._imagesSelectedAsFilesState.save(files);

        return userMessage;
    }

    private _getImages() {
        return (this._imagesSelectedState.$state() ?? []).map((image) => ImageMapper.toDomain(image));
    }
}
