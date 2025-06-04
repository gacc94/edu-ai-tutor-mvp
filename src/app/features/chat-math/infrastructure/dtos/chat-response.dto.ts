export interface ChatResponseDto {
    content: string;
}

export class ChatResponse implements ChatResponseDto {
    constructor(public content: string) {}
}
