import { Message } from '@features/chat-math/domain/entities/message.entity';
import { ChatResult } from '@features/chat-math/domain/interfaces/chat-result';
import { ChatResponseDto } from '../dtos/chat.dto';
import { MessageFactory } from '@features/chat-math/domain/factories/message.factory';

export class ChatMapper {
    static toFormData(message: Message, files: File[]): FormData {
        const { id, content } = message;
        const formData = new FormData();
        formData.append('id', id);
        formData.append('prompt', content);
        if (files.length > 0) {
            files.forEach((file) => {
                formData.append(`files`, file, file.name);
            });
        }
        return formData;
    }

    static toDomainResult(chatResponse: ChatResponseDto): ChatResult {
        return {
            type: chatResponse.type,
            solutionText: chatResponse.solutionText,
            solutionImage: chatResponse.solutionImage,
            userContext: {
                creditsRemaining: chatResponse.userContext.creditsRemaining,
                plan: chatResponse.userContext.plan,
            },
        };
    }

    static toDomain(chatResult: ChatResult): Message {
        return MessageFactory.createAiMessage(chatResult.solutionText);
    }
}
