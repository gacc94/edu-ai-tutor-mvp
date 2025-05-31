import { Image } from '@features/chat-math-solve/domain/entities/image.entity';
import { RoleType } from '@features/chat-math-solve/domain/entities/message.entity';

export interface ChatMathState {
    messages: MessageState[];
    selectedImages: Image[];
    selectedImagesAsFiles: File[];
    isLoading: boolean;
    error: string | null;
}

export interface MessageState {
    id: string;
    role: RoleType;
    content: string;
    images?: Array<Image>;
}
