import { Image } from '../entities/image.entity';
import { Message } from '../entities/message.entity';

export class MessageFactory {
    static createUserMessage(message: string, images?: Array<Image>): Message {
        return new Message('user', message, images);
    }

    static createAiMessage(message: string): Message {
        return new Message('ai', message);
    }
}
