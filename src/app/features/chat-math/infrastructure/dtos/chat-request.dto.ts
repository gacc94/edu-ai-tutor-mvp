export interface ChatRequestDto {
    id: string;
    message: string;
    files: File[];
}

export class ChatRequest implements ChatRequestDto {
    constructor(public id: string, public message: string, public files: File[]) {}
}
