import { Injectable, inject } from '@angular/core';
import { MessageFactory } from '@features/chat-math/domain/factories/message.factory';
import { ImageMapper } from '../mappers/image.mapper';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { IPrepareSendingMessageUseCase } from '../interfaces/prepare-sending-message-use-case';
import { ImageState } from '@features/chat-math/application/states/interfaces';

export class PrepareSendingMessageUseCase implements IPrepareSendingMessageUseCase {
    async execute(content: string, imagesState: ImageState[]): Promise<Message> {
        // const imagesState = this._imagesSelectedState.$state() ?? [];
        // const messagesState = this._messagesState.$state() ?? [];

        const images = imagesState.map((image: ImageState) => ImageMapper.toDomain(image));
        const files = await ImageMapper.toFiles(images);

        const userMessage = MessageFactory.createUserMessage(content, images);
        // const userMessageState = MessageMapper.toState(userMessage);

        // this._messagesState.save([...messagesState, userMessageState]);
        // this._imagesSelectedAsFilesState.save(files);

        return userMessage;
    }
}
