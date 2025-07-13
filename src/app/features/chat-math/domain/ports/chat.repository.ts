import { Message } from '@features/chat-math/domain/entities/message.entity';
import { ChatResult } from '@features/chat-math/domain/interfaces/chat-result';

export interface ChatPort {
    sendMessage(message: Message, files: File[]): Promise<ChatResult>;
}
