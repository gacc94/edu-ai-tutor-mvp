import { Image } from './image.entity';
import { v4 as uuidv4 } from 'uuid';

export type RoleType = 'user' | 'ai';

export interface MessageProps {
    role: RoleType;
    content: string;
    images?: Array<Image>;
    avatar?: string;
}

export class Message {
    private _id: string;
    private _role: RoleType;
    private _content: string;
    private _images?: Array<Image>;
    private _avatar?: string;

    /**
     *
     * @param param0
     */
    constructor({ role, content, images, avatar }: MessageProps) {
        this._id = uuidv4();
        this._role = role;
        this._content = content;
        this._images = images;
        this._avatar = avatar;
    }

    get id(): string {
        return this._id;
    }

    get role(): RoleType {
        return this._role;
    }

    get content(): string {
        return this._content;
    }

    get images(): Array<Image> {
        return this._images ?? [];
    }

    get avatar(): string | undefined {
        return this._avatar;
    }

    isUser(): boolean {
        return this.role === 'user';
    }

    isAi(): boolean {
        return this.role === 'ai';
    }
}
