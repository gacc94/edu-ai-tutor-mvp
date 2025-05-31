import { Message } from '../entities/message.entity';

export interface ChatRepository {
    sendMessage(message: Message): Promise<string>;
}
