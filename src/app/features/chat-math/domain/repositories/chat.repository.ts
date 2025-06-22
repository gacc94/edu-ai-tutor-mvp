import { Message } from '@features/chat-math/domain/entities/message.entity';

export interface ChatRepository {
    sendMessage(message: Message): Promise<string>;
}
