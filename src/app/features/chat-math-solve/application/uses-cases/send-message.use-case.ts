import { Injectable, InjectionToken, Inject } from '@angular/core';
import { ChatMathStateService } from '../states/chat-math.state';
import { Message } from '@features/chat-math-solve/domain/entities/message.entity';
import { ChatRepository } from '@features/chat-math-solve/domain/repositories/chat.repository';
import { CHAT_REPOSITORY } from '@features/chat-math-solve/infrastructure/providers/provider';

@Injectable({ providedIn: 'root' })
export class SendMessageUseCase {
    constructor(
        private readonly _state: ChatMathStateService,
        @Inject(CHAT_REPOSITORY) private _repository: ChatRepository
    ) {}

    execute(message: Message) {
        this._repository.sendMessage(message);
    }
}
