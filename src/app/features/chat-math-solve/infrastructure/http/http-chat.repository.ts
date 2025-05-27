import { Message } from '@features/chat-math-solve/domain/entities/message.entity';
import { ChatRepository } from '@features/chat-math-solve/domain/repositories/chat.repository';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { ChatMathStateService } from '@features/chat-math-solve/application/states/chat-math.state';
import { ChatMapper } from '../mappers/chat.mapper';

@Injectable({ providedIn: 'root' })
export class HttpChatRepository implements ChatRepository {
    constructor(private readonly _chatState: ChatMathStateService) {}

    async sendMessage(message: Message): Promise<string> {
        const files = this._chatState.$selectedImagesAsFiles();
        const formData = ChatMapper.toFormData(message, files);

        console.log(formData);

        // Make the API call
        const response = await fetch(environment.apis.openai.baseUrl, {
            method: 'POST',
            body: formData,
        });

        // Map and return the response
        return response.json();
    }
}
