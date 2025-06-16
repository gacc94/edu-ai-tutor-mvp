import { InjectionToken } from '@angular/core';
import { ImageState, MessageState } from './interfaces';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { StateStorageRepository } from '@shared/storage/services/state-storage.repository';
import { STORAGE_TOKEN } from '@shared/storage/providers/storage.provider';
import { inject } from '@angular/core';
import { Message } from '@features/chat-math/domain/entities/message.entity';

export const MESSAGES_STATE = new InjectionToken<IStateStorage<Message[]>>('MESSAGES_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<Message[]>(inject(STORAGE_TOKEN), 'mathMessages'),
});

export const IMAGES_SELECTED_STATE = new InjectionToken<IStateStorage<ImageState[]>>('IMAGES_SELECTED_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<ImageState[]>(inject(STORAGE_TOKEN), 'mathImagesSelected'),
});

export const IMAGES_SELECTED_AS_FILES_STATE = new InjectionToken<IStateStorage<File[]>>(
    'IMAGES_SELECTED_AS_FILES_STATE',
    {
        providedIn: 'root',
        factory: () => new StateStorageRepository<File[]>(inject(STORAGE_TOKEN)),
    }
);
