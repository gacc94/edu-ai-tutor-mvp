import { Message } from '@features/chat-math/domain/entities/message.entity';
import { ChatRepository } from '@features/chat-math/domain/repositories/chat.repository';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { ChatMapper } from '../mappers/chat.mapper';
import { IMAGES_SELECTED_AS_FILES_STATE } from '@features/chat-math/application/states/chat-math.state';
import { Inject } from '@angular/core';
import { StateStorage } from '@shared/storage/interfaces/state-storage.interface';

@Injectable({ providedIn: 'root' })
export class HttpChatRepository implements ChatRepository {
    constructor(@Inject(IMAGES_SELECTED_AS_FILES_STATE) private readonly _chatState: StateStorage<Array<File>>) {}

    async sendMessage(message: Message): Promise<string> {
        const files = this._chatState.$state() ?? [];
        const formData = ChatMapper.toFormData(message, files);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    `La respuesta del ejercicio es un texto que describe como se resolvi o el ejercicio. Por ejemplo, si el ejercicio es "2 + 2" la respuesta sera "La respuesta del ejercicio es 4, que es el resultado de la suma de 2 + 2".`
                );
            }, 3000);
        });
    }
}
