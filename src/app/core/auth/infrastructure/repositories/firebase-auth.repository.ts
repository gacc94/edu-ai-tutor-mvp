import { Injectable, inject } from '@angular/core';
import { 
    Auth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    getAdditionalUserInfo, 
    User as FirebaseUser
} from '@angular/fire/auth';
import { AuthRepository, AuthResult } from '@core/auth/domain/repositories/auth.repository';
import { UserFactory } from '@core/auth/domain/factories/user.factory';
import { User } from '@core/auth/domain/entities/user.entity';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthRepository implements AuthRepository {
    private readonly _auth = inject(Auth);
    private readonly _googleProvider = new GoogleAuthProvider();

    /**
     * Sign in with Google OAuth
     * @returns AuthResult with user, token and isNewUser flag
     */
    async signInWithGoogle(): Promise<AuthResult> {
        try {
            const result = await signInWithPopup(this._auth, this._googleProvider);
            const firebaseUser = result.user;
            const additionalInfo = getAdditionalUserInfo(result);

            if (!firebaseUser.email) {
                throw new Error('Google sign-in failed: No email provided');
            }

            const token = await firebaseUser.getIdToken(true);
            const user = UserFactory.createFromFirebaseUser(firebaseUser, 'google');

            return {
                user,
                token,
                isNewUser: additionalInfo?.isNewUser ?? false,
            };
        } catch (error) {
            console.error('Google sign-in error:', error);
            throw new Error('Failed to sign in with Google');
        }
    }

    /**
     * Sign in with email and password
     * @param email User's email
     * @param password User's password
     * @returns AuthResult with user and token
     */
    async signInWithEmail(email: string, password: string): Promise<AuthResult> {
        throw new Error('Email sign-in not implemented yet');
    }

    /**
     * Sign up with email and password
     * @param email User's email
     * @param password User's password
     * @returns AuthResult with user and token
     */
    async signUpWithEmail(email: string, password: string): Promise<AuthResult> {
        throw new Error('Email sign-up not implemented yet');
    }

    /**
     * Sign out the current user
     */
    async signOut(): Promise<void> {
        try {
            await signOut(this._auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw new Error('Failed to sign out');
        }
    }

    /**
     * Get the currently authenticated user
     * @returns The current user or null if not authenticated
     */
    async getCurrentUser(): Promise<User | null> {
        try {
            const firebaseUser = this._auth.currentUser;
            if (!firebaseUser) return null;

            return UserFactory.createFromFirebaseUser(firebaseUser);
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    /**
     * Get the current authentication token
     * @returns The current auth token or null if not authenticated
     */
    async getAuthToken(): Promise<string | null> {
        try {
            const firebaseUser = this._auth.currentUser;
            if (!firebaseUser) return null;

            return await firebaseUser.getIdToken();
        } catch (error) {
            console.error('Error getting auth token:', error);
            return null;
        }
    }
}
