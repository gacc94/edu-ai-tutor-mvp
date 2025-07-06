import { User } from '../entities';
import { UserAuthResult } from '../interfaces/user-auth-result';

export interface IUserAuthPort {
    /**
     * Sign in
     */
    signIn(): Promise<UserAuthResult<User>>;
}
