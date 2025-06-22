import { Injectable } from '@angular/core';
import {
    Auth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from '@angular/fire/auth';
import { AuthRepository, SignInResult } from '@core/auth/domain/repositories/auth.repository';
import { User } from '@core/auth/domain/entities/user.entity';
import { UserFactory } from '@core/auth/domain/factories/user.factory';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthRepository implements AuthRepository {
    constructor(private _auth: Auth) {}

    async signInWithGoogle(): Promise<SignInResult> {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            provider.setCustomParameters({
                prompt: 'select_account', // Ensures the user can choose an account
            });
            // Sign in with a popup
            // You can also use signInWithRedirect if you prefer a full-page redirect
            // signInWithRedirect(this._auth, provider);
            // Using signInWithPopup for a more seamless experience
            // Note: Ensure your Firebase project is configured to allow Google sign-in
            // and that you have enabled the Google sign-in method in the Firebase console.

            const result = await signInWithPopup(this._auth, provider);
            const firebaseUser = result.user;

            if (!firebaseUser.email || !firebaseUser.displayName) {
                throw new Error('Missing required user information');
            }

            const user = UserFactory.createFromGoogle({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL || undefined,
            });

            // Check if this is a new user (you might want to implement this differently)
            const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;

            return { user, isNewUser };
        } catch (error) {
            throw new Error(`Google sign-in failed: ${error}`);
        }
    }

    async signOut(): Promise<void> {
        try {
            await signOut(this._auth);
        } catch (error) {
            throw new Error(`Sign out failed: ${error}`);
        }
    }

    async getCurrentUser(): Promise<User | null> {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(this._auth, (firebaseUser) => {
                unsubscribe();
                if (firebaseUser && firebaseUser.email && firebaseUser.displayName) {
                    const user = UserFactory.createFromGoogle({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        photoURL: firebaseUser.photoURL || undefined,
                    });
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    }

    onAuthStateChanged(callback: (user: User | null) => void): () => void {
        return onAuthStateChanged(this._auth, (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser && firebaseUser.email && firebaseUser.displayName) {
                const user = UserFactory.createFromGoogle({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL || undefined,
                });
                callback(user);
            } else {
                callback(null);
            }
        });
    }
}
