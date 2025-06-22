export interface AppResponseDto<T> {
    metadata: {};
    data: T;
}

export class AppResponse<T> implements AppResponseDto<T> {
    constructor(public metadata: {}, public data: T) {}
}
