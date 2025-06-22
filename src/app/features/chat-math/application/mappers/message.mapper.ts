import { Message } from '@features/chat-math/domain/entities/message.entity';
import { MessageState } from '@features/chat-math/application/states/interfaces/message.state';
import { ImageMapper } from './image.mapper';

export class MessageMapper {
    /**
     * Converts a Message entity to a MessageState object
     * @param message
     * @returns
     */
    static toState(message: Message): MessageState {
        return {
            id: message.id,
            role: message.role,
            content: message.content,
            images: message.images.map((image) => ImageMapper.toState(image)),
            isAi: message.isAi(),
            isUser: message.isUser(),
        };
    }
}
