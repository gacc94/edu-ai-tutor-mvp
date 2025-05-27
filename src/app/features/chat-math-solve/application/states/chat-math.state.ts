import { Injectable, inject, linkedSignal } from '@angular/core';
import { signal } from '@angular/core';
import { ChatMathState, MessageState } from './interfaces/math-solve.interface';
import { Image } from '@features/chat-math-solve/domain/entities/image.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectionToken } from '@angular/core';
import { StorageRepository } from '@shared/storage/interfaces/storage.interface';
import { StateStorageRepository } from '@shared/storage/state-storage.repository';
import { PreferencesStorage } from '@shared/storage/preference-storage';

const MESSAGES_STATE = new InjectionToken<StorageRepository<ChatMathState>>('MESSAGE_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<ChatMathState>(inject(PreferencesStorage), 'MESSAGE_STATE'),
});

@Injectable({ providedIn: 'root' })
export class ChatMathStateService {
    private readonly _state = signal<ChatMathState>({
        messages: [
            {
                id: uuidv4(),
                role: 'ai',
                content: '¡Hola! Soy tu asistente EduAiTutor. Envíame tu ejercicio y te ayudo paso a paso. 😊',
            },
        ],
        selectedImages: [],
        selectedImagesAsFiles: [],
        isLoading: false,
        error: null,
    });

    readonly $messages = linkedSignal(() => this._state().messages);
    readonly $selectedImages = linkedSignal(() => this._state().selectedImages);
    readonly $isLoading = linkedSignal(() => this._state().isLoading);
    readonly $selectedImagesAsFiles = linkedSignal(() => this._state().selectedImagesAsFiles);

    set isLoading(isLoading: boolean) {
        this.$isLoading.update(() => isLoading);
    }

    set selectedImage(image: Image) {
        this.$selectedImages.update((prev) => [...prev, image]);
    }

    set selectedImageAsFile(images: File[]) {
        this.$selectedImagesAsFiles.update((prev) => [...prev, ...images]);
    }

    set message(message: MessageState) {
        this.$messages.update((prev) => [...prev, message]);
    }
}
