export interface AppResponseDto<T> {
    statusCode: number;
    message: string;
    metadata: {};
    data: T;
}

export class AppResponse<T> implements AppResponseDto<T> {
    statusCode: number;
    message: string;
    metadata: {};
    data: T;

    constructor(statusCode: number, message: string, metadata: {}, data: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.metadata = metadata;
        this.data = data;
    }
}
