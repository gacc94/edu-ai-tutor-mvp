import { Image } from '../entities/image.entity';
import { Message } from '../entities/message.entity';

export class MessageFactory {
    static createUserMessage(content: string, images: Image[]): Message {
        return new Message({ role: 'user', content, images });
    }

    static createAiMessage(content: string): Message {
        return new Message({ role: 'ai', content });
    }
}
