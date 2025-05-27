import { InjectionToken, Provider } from '@angular/core';
import { ChatRepository } from '@features/chat-math-solve/domain/repositories/chat.repository';
import { HttpChatRepository } from '../http/http-chat.repository';
import { CameraService } from '@shared/services/camera.service';
import { ChatMathStateService } from '@features/chat-math-solve/application/states/chat-math.state';

export const CHAT_REPOSITORY = new InjectionToken<ChatRepository>('ChatRepository');

export const CHAT_MATH_PROVIDERS: Provider[] = [
    {
        provide: CHAT_REPOSITORY,
        useFactory: (chatState: ChatMathStateService) => new HttpChatRepository(chatState),
        deps: [ChatMathStateService],
    },
];
