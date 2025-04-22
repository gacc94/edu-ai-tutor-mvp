import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    #auth = inject(Auth);
    #googleProvider = new GoogleAuthProvider();

    async signInWithGoogle() {
        try {
            const result = await signInWithPopup(this.#auth, this.#googleProvider);
            const user = result.user;
            const [token, tokenResult] = await Promise.all([user.getIdToken(), user.getIdTokenResult()]);
            return { token, tokenResult, user };
        } catch (error) {
            console.error('Google sign-in error:', error);
            return null;
        }
    }
}
