import { InjectionToken } from '@angular/core';
import { ImageState, MessageState, CreditsState } from './interfaces';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { StateStorageRepository } from '@shared/storage/services/state-storage.repository';
import { STORAGE_KEYS } from '@shared/utils/constants/storage-keys.constants';

export const MESSAGES_STATE = new InjectionToken<IStateStorage<MessageState[]>>('MESSAGES_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<MessageState[]>(STORAGE_KEYS.messagesMath),
});

export const IMAGES_SELECTED_STATE = new InjectionToken<IStateStorage<ImageState[]>>('IMAGES_SELECTED_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<ImageState[]>(STORAGE_KEYS.imagesSelectedMath),
});

export const IMAGES_SELECTED_AS_FILES_STATE = new InjectionToken<IStateStorage<File[]>>(
    'IMAGES_SELECTED_AS_FILES_STATE',
    {
        providedIn: 'root',
        factory: () => new StateStorageRepository<File[]>(),
    }
);

export const CREDITS_STATE = new InjectionToken<IStateStorage<CreditsState>>('CREDITS_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<CreditsState>(STORAGE_KEYS.credits),
});
