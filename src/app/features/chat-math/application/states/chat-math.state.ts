import { MessageState } from './interfaces/chat-math.state.interface';
import { Image } from '@features/chat-math/domain/entities/image.entity';
import { InjectionToken } from '@angular/core';
import { StateStorage } from '@shared/storage/interfaces/state-storage.interface';

export const MESSAGES_STATE = new InjectionToken<StateStorage<MessageState[]>>('StorageRepository<MessageState[]>');

export const IMAGES_SELECTED_STATE = new InjectionToken<StateStorage<Image[]>>('StorageRepository<Image[]>');

export const IMAGES_SELECTED_AS_FILES_STATE = new InjectionToken<StateStorage<File[]>>('StorageRepository<File[]>');
