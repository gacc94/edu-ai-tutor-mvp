import { inject } from '@angular/core';
import {
    IMAGES_SELECTED_AS_FILES_STATE,
    IMAGES_SELECTED_STATE,
    MESSAGES_STATE,
    PREPARE_SENDING_MESSAGE_USE_CASE,
    SEND_MESSAGE_USE_CASE,
} from '@features/chat-math/infrastructure/providers/provider';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { ChatMapper } from '@features/chat-math/infrastructure/mappers/chat.mapper';
import { Injectable } from '@angular/core';
import { ChatResult } from '@features/chat-math/domain/interfaces/chat-result';
import { CameraService } from '@shared/services/camera.service';
import { CameraSource } from '@capacitor/camera';
import { ImageFactory } from '@features/chat-math/domain/factories/image.factory';
import { ImageMapper } from '@features/chat-math/application/mappers/image.mapper';
import { MessageMapper } from '@features/chat-math/infrastructure/mappers/message.mapper';

@Injectable({ providedIn: 'root' })
export class ChatFacade {
    private readonly _messagesState = inject(MESSAGES_STATE);
    private readonly _imagesSelectedAsFilesState = inject(IMAGES_SELECTED_AS_FILES_STATE);
    private readonly _imagesSelectedState = inject(IMAGES_SELECTED_STATE);
    private readonly _cameraService = inject(CameraService);

    private readonly _sendMessageUseCase = inject(SEND_MESSAGE_USE_CASE);
    private readonly _prepareSendingMessageUseCase = inject(PREPARE_SENDING_MESSAGE_USE_CASE);

    /**
     * Send message
     * @param message
     */
    async sendMessage(message: Message): Promise<void> {
        const filesState = this._imagesSelectedAsFilesState.$state() ?? [];

        const result = await this._sendMessageUseCase.execute(message, filesState);

        const aiMessage = this._mapToState(result);

        await this._messagesState.save([...(this._messagesState.$state() ?? []), aiMessage]);
    }

    /**
     * Take picture
     * @param source
     */
    async takePicture(source: CameraSource): Promise<void> {
        const photo = await this._cameraService.takePicture(source);

        const image = ImageFactory.create(photo);

        const imageState = ImageMapper.toState(image);

        await this._imagesSelectedState.save([...(this._imagesSelectedState.$state() ?? []), imageState]);
    }

    /**
     * Preparing sending message
     * @param message
     * @returns
     */
    async preparingSendingMessage(message: string) {
        const imagesState = this._imagesSelectedState.$state() ?? [];

        const userMessage = await this._prepareSendingMessageUseCase.execute(message, imagesState);

        const userMessageState = MessageMapper.toState(userMessage);

        await this._messagesState.save([...(this._messagesState.$state() ?? []), userMessageState]);
        await this._imagesSelectedAsFilesState.save(await ImageMapper.toFiles(userMessage.images));

        return userMessage;
    }

    private _mapToState(messages: ChatResult) {
        const aiMessage = ChatMapper.toDomain(messages);
        return MessageMapper.toState(aiMessage);
    }
}
