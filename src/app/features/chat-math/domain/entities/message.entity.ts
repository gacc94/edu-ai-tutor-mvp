import { Image } from './image.entity';
import { v4 as uuidv4 } from 'uuid';

export type RoleType = 'user' | 'ai';

export class Message {
    id: string;
    role: RoleType;
    content: string;
    images?: Array<Image>;
    userAvatar?: string;

    constructor(role: RoleType, content: string, images?: Array<Image>, userAvatar?: string) {
        this.id = uuidv4();
        this.role = role;
        this.content = content;
        this.images = images;
        this.userAvatar = userAvatar;
    }
}
