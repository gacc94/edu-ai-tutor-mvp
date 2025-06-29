import { ITokenState } from '@core/auth/application/states/interfaces/token.state';

export interface IAuthRepository {
    signInWithGoogle(): Promise<ITokenState>;
}
