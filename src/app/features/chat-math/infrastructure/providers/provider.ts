import { InjectionToken, Provider } from '@angular/core';
import { ChatHttpRepository } from '../http/chat-http.repository';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { StateStorageRepository } from '@shared/storage/services/state-storage.repository';
import { STORAGE_KEYS } from '@shared/utils/constants/storage-keys.constants';
import { MessageState } from '@features/chat-math/application/states/interfaces';
import { ImageState } from '@features/chat-math/application/states/interfaces';
import { ISendMessageUseCase } from '@features/chat-math/application/interfaces/send-message-use-case';
import { SendMessageUseCase } from '@features/chat-math/application/uses-cases/send-message.use-case';
import { IPrepareSendingMessageUseCase } from '@features/chat-math/application/interfaces/prepare-sending-message-use-case';
import { PrepareSendingMessageUseCase } from '@features/chat-math/application/uses-cases/prepare-sending-message.use-case';

/**
 * Repositories
 */
export const HTTP_CHAT_REPOSITORY = new InjectionToken<ChatHttpRepository>('HttpChatRepository', {
    providedIn: 'root',
    factory: () => new ChatHttpRepository(),
});

export const SEND_MESSAGE_USE_CASE = new InjectionToken<ISendMessageUseCase>('SendMessageUseCase', {
    providedIn: 'root',
    factory: () => new SendMessageUseCase(),
});

export const PREPARE_SENDING_MESSAGE_USE_CASE = new InjectionToken<IPrepareSendingMessageUseCase>('PrepareSendingMessageUseCase', {
    providedIn: 'root',
    factory: () => new PrepareSendingMessageUseCase(),
});

/**
 * States
 */

export const MESSAGES_STATE = new InjectionToken<IStateStorage<MessageState[]>>('MESSAGES_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<MessageState[]>(STORAGE_KEYS.messagesMath),
});

export const IMAGES_SELECTED_STATE = new InjectionToken<IStateStorage<ImageState[]>>('IMAGES_SELECTED_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<ImageState[]>(STORAGE_KEYS.imagesSelectedMath),
});

export const IMAGES_SELECTED_AS_FILES_STATE = new InjectionToken<IStateStorage<File[]>>('IMAGES_SELECTED_AS_FILES_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<File[]>(STORAGE_KEYS.imagesSelectedAsFilesMath),
});
