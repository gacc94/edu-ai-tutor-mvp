import { Injectable } from '@angular/core';
import { SendMessageUseCase } from '@features/chat-math/application/uses-cases/send-message.use-case';
import { PrepareSendingMessageUseCase } from '@features/chat-math/application/uses-cases/prepare-sending-message.use-case';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { TakePictureUseCase } from '@features/chat-math/application/uses-cases/take-picture.use-case';
import { CameraSource } from '@capacitor/camera';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private readonly _sendMessageUseCase = inject(SendMessageUseCase);
    private readonly _prepareSendingMessageUseCase = inject(PrepareSendingMessageUseCase);
    private readonly _takePictureUseCase = inject(TakePictureUseCase);

    sendMessage(message: Message): Promise<void> {
        return this._sendMessageUseCase.execute(message);
    }

    prepareSendingMessage(message: string): Promise<Message> {
        return this._prepareSendingMessageUseCase.execute(message);
    }

    takePicture(source: CameraSource): Promise<void> {
        return this._takePictureUseCase.execute(source);
    }
}
