export interface IBaseUseCase<T, P extends any[]> {
    execute(...params: P): T;
}
