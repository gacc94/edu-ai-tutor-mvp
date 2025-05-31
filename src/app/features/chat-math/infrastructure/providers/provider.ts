import { InjectionToken, inject, Provider } from '@angular/core';
import { ChatRepository } from '@features/chat-math/domain/repositories/chat.repository';
import { HttpChatRepository } from '../http/http-chat.repository';
import {
    IMAGES_SELECTED_AS_FILES_STATE,
    MESSAGES_STATE,
    IMAGES_SELECTED_STATE,
} from '@features/chat-math/application/states/chat-math.state';
import { StateStorageRepository } from '@shared/storage/state-storage.repository';
import { STORAGE_TOKEN } from '@shared/storage/providers/storage.provider';
import { MessageState } from '@features/chat-math/application/states/interfaces/chat-math.state.interface';
import { Image } from '@features/chat-math/domain/entities/image.entity';

export const HTTP_CHAT_REPOSITORY = new InjectionToken<ChatRepository>('ChatRepository');

export const CHAT_PROVIDER: Provider[] = [
    {
        provide: HTTP_CHAT_REPOSITORY,
        useFactory: () => new HttpChatRepository(inject(IMAGES_SELECTED_AS_FILES_STATE)),
    },
    {
        provide: MESSAGES_STATE,
        useFactory: () => new StateStorageRepository<MessageState[]>(inject(STORAGE_TOKEN), 'mathMessages'),
    },
    {
        provide: IMAGES_SELECTED_STATE,
        useFactory: () => new StateStorageRepository<Image[]>(inject(STORAGE_TOKEN), 'mathImagesSelected'),
    },
    {
        provide: IMAGES_SELECTED_AS_FILES_STATE,
        useFactory: () => new StateStorageRepository<File[]>(inject(STORAGE_TOKEN)),
    },
];
