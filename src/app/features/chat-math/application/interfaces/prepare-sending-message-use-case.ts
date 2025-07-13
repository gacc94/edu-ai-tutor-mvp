import { IBaseUseCase } from '@shared/application/interfaces/base-use-case';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { ImageState } from '../states/interfaces';

export interface IPrepareSendingMessageUseCase extends IBaseUseCase<Promise<Message>, [string, ImageState[]]> {}
