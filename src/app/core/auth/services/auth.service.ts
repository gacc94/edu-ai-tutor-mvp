import { inject, Injectable } from '@angular/core';
import { Auth, getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    #auth = inject(Auth);
    #googleProvider = new GoogleAuthProvider();

    async signInWithGoogle() {
        try {
            const result: UserCredential = await signInWithPopup(this.#auth, this.#googleProvider);
            const user = result.user;
            console.log({ toJson: user.toJSON() });
            const [token, tokenResult] = await Promise.all([user.getIdToken(true), user.getIdTokenResult(true)]);

            const resp = getAdditionalUserInfo(result);
            console.log({ resp });
            return { token, tokenResult, user };
        } catch (error) {
            console.error('Google sign-in error:', error);
            return null;
        }
    }
}
