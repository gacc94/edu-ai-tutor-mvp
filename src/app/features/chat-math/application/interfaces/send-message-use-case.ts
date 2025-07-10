import { ChatResult } from '@features/chat-math/domain/interfaces/chat-result';
import { IBaseUseCase } from '@shared/application/interfaces/base-use-case';
import { Message } from '@features/chat-math/domain/entities/message.entity';

export interface ISendMessageUseCase extends IBaseUseCase<Promise<ChatResult>, [Message, File[]]> {}
