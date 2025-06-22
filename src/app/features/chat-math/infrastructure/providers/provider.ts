import { InjectionToken, inject } from '@angular/core';
import { ChatRepository } from '@features/chat-math/domain/repositories/chat.repository';
import { HttpChatRepository } from '../http/http-chat.repository';
import { IMAGES_SELECTED_AS_FILES_STATE } from '@features/chat-math/application/states/states';

export const HTTP_CHAT_REPOSITORY = new InjectionToken<ChatRepository>('ChatRepository', {
    providedIn: 'root',
    factory: () => new HttpChatRepository(inject(IMAGES_SELECTED_AS_FILES_STATE)),
});
