import { Injectable, inject } from '@angular/core';
import { ChatMapper } from '../mappers/chat.mapper';
import { environment } from '@envs/environment';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { HttpClient } from '@angular/common/http';
import { HttpContext } from '@angular/common/http';
import { WITH_AUTH_TOKEN } from '@core/interceptors/http-context.tokens';
import { firstValueFrom, map } from 'rxjs';
import { ChatPort } from '@features/chat-math/domain/ports/chat.repository';
import { ChatResult } from '@features/chat-math/domain/interfaces/chat-result';
import { ChatHttpResponseDto } from '../dtos/chat.dto';
import { ChatHttpResponseSchema } from '../schemas/chat.schema';

@Injectable({ providedIn: 'root' })
export class ChatHttpRepository implements ChatPort {
    private readonly _baseUrl: string = environment.apis.gemini.mathSolve;

    private readonly _http = inject(HttpClient);

    async sendMessage(message: Message, files: File[]): Promise<ChatResult> {
        const formData = ChatMapper.toFormData(message, files);

        const response$ = this._http
            .post<ChatHttpResponseDto>(this._baseUrl, formData, {
                context: new HttpContext().set(WITH_AUTH_TOKEN, true),
            })
            .pipe(
                map((response) => ChatHttpResponseSchema.parse(response).data),
                map((data) => ChatMapper.toDomainResult(data))
            );

        return firstValueFrom(response$);
    }
}
