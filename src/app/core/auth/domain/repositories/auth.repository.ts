import { User } from '../entities/user.entity';

export interface SignInResult {
    user: User;
    isNewUser: boolean;
}

export interface AuthRepository {
    signInWithGoogle(): Promise<SignInResult>;
    signOut(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
    onAuthStateChanged(callback: (user: User | null) => void): () => void;
}
