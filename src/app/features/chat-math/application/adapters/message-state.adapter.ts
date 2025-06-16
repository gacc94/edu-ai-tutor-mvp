import { Message } from '@features/chat-math/domain/entities/message.entity';
import { MessageState } from '@features/chat-math/application/states/interfaces/message.state';

export class MessageStateAdapter {
    /**
     *
     * @param message
     * @returns
     */
    static adapt(message: Message): MessageState {
        return {
            id: message.id,
            role: message.role,
            content: message.content,
            images: message.images,
            isAi: message.isAi(),
            isUser: message.isUser(),
        };
    }
}
