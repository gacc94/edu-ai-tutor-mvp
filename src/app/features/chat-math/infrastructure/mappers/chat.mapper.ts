import { ChatRequest, ChatRequestDto } from '../dtos/chat-request.dto';
import { Message } from '@features/chat-math/domain/entities/message.entity';

export class ChatMapper {
    static toRequestDto(message: Message, files: File[]): ChatRequestDto {
        return new ChatRequest(message.id, message.content, files);
    }

    static toResponseDto(response: any): any {
        return response;
    }

    static toFormData(message: Message, files: File[]): FormData {
        const { id, content } = message;
        const formData = new FormData();
        formData.append('id', id);
        formData.append('prompt', content);
        files.forEach((file) => {
            formData.append(`files`, file, file.name);
        });
        return formData;
    }
}
