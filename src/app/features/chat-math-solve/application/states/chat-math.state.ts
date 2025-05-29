import { inject } from '@angular/core';
import { MessageState } from './interfaces/chat-math.state.interface';
import { Image } from '@features/chat-math-solve/domain/entities/image.entity';
import { InjectionToken } from '@angular/core';
import { StateStorageRepository } from '@shared/storage/state-storage.repository';
import { StateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { STORAGE_TOKEN } from '@shared/storage/providers/storage.provider';

export const MESSAGES_STATE = new InjectionToken<StateStorage<Array<MessageState>>>(
    'StorageRepository<Array<MessageState>>',
    {
        providedIn: 'root',
        factory: () => new StateStorageRepository<Array<MessageState>>(inject(STORAGE_TOKEN), 'mathMessages'),
    }
);

export const IMAGES_SELECTED_STATE = new InjectionToken<StateStorage<Array<Image>>>('StorageRepository<Array<Image>>', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<Array<Image>>(inject(STORAGE_TOKEN), 'mathImagesSelected'),
});

export const IMAGES_SELECTED_AS_FILES_STATE = new InjectionToken<StateStorage<Array<File>>>(
    'StorageRepository<Array<File>>',
    {
        providedIn: 'root',
        factory: () => new StateStorageRepository<Array<File>>(inject(STORAGE_TOKEN)),
    }
);
