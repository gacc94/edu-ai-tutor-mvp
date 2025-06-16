import { ImageState } from './image.state';
import { RoleType } from '@features/chat-math/domain/entities/message.entity';

export interface MessageState {
    id: string;
    role: RoleType;
    content: string;
    images?: ImageState[];
    isAi: boolean;
    isUser: boolean;
}
