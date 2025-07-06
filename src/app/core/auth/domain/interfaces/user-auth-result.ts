export interface UserAuthResult<T> {
    success: boolean;
    isNewUser: boolean;
    user: T;
}
