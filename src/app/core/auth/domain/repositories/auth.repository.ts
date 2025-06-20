import { User } from '../entities/user.entity';

export interface AuthResult {
    user: User;
    token: string;
    isNewUser: boolean;
}

export interface AuthRepository {
    /**
     * Sign in with Google OAuth
     * @returns AuthResult with user, token and isNewUser flag
     */
    signInWithGoogle(): Promise<AuthResult>;
    
    /**
     * Sign in with email and password
     * @param email User's email
     * @param password User's password
     * @returns AuthResult with user and token
     */
    signInWithEmail(email: string, password: string): Promise<AuthResult>;
    
    /**
     * Sign up with email and password
     * @param email User's email
     * @param password User's password
     * @returns AuthResult with user and token
     */
    signUpWithEmail(email: string, password: string): Promise<AuthResult>;
    
    /**
     * Sign out the current user
     */
    signOut(): Promise<void>;
    
    /**
     * Get the currently authenticated user
     * @returns The current user or null if not authenticated
     */
    getCurrentUser(): Promise<User | null>;
    
    /**
     * Get the current authentication token
     * @returns The current auth token or null if not authenticated
     */
    getAuthToken(): Promise<string | null>;
}
