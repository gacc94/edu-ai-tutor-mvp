import { Image } from '@features/chat-math/domain/entities/image.entity';
import { RoleType } from '@features/chat-math/domain/entities/message.entity';

export interface MessageState {
    id: string;
    role: RoleType;
    content: string;
    images?: Array<Image>;
}
