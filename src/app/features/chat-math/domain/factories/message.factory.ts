import { Image } from '../entities/image.entity';
import { Message } from '../entities/message.entity';

export class MessageFactory {
    static createUserMessage(message: string, images?: Array<Image>): Message {
        return new Message({ role: 'user', content: message, images });
    }

    static createAiMessage(message: string): Message {
        return new Message({ role: 'ai', content: message });
    }
}
