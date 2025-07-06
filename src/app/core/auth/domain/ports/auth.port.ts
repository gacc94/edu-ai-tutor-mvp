import { Observable } from 'rxjs';
import { Token } from '../entities';
import { AuthProvider } from '../enums';

export interface IAuthPort {
    /**
     * Sign in with Google
     */
    signInWithProvider(provider: AuthProvider): Promise<Token>;
}
