import { Message } from '@features/chat-math/domain/entities/message.entity';
import { ChatRepository } from '@features/chat-math/domain/repositories/chat.repository';
import { Injectable, Inject } from '@angular/core';
import { ChatMapper } from '../mappers/chat.mapper';
import { IMAGES_SELECTED_AS_FILES_STATE } from '@features/chat-math/application/states/chat-math.state';
import { StateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { AppResponse } from '@shared/infrastructure/dtos/app-response.dto';
import { ChatResponseDto } from '../dtos/chat-response.dto';
import { environment } from '@envs/environment';

@Injectable({ providedIn: 'root' })
export class HttpChatRepository implements ChatRepository {
    private readonly _baseUrl: string = environment.apis.gemini.mathSolve;

    constructor(@Inject(IMAGES_SELECTED_AS_FILES_STATE) private readonly _chatState: StateStorage<Array<File>>) {}

    async sendMessage(message: Message): Promise<string> {
        const files = this._chatState.$state() ?? [];
        const formData = ChatMapper.toFormData(message, files);

        const response = await fetch(this._baseUrl, {
            method: 'POST',
            body: formData,
        });
        const data = (await response.json()) as AppResponse<ChatResponseDto>;
        return data.data.content;
    }
}
