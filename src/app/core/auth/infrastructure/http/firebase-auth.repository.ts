import { GoogleAuthProvider, signInWithPopup, Auth, FacebookAuthProvider, GithubAuthProvider } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { TokenMapper } from '@core/auth/infrastructure/mappers/token.mapper';
import { Token } from '@core/auth/domain/entities';
import { IAuthPort } from '@core/auth/domain/ports/auth.port';
import { AuthProvider } from '@core/auth/domain/enums';
import { getIdTokenResult } from 'firebase/auth';

export class FirebaseAuthRepository implements IAuthPort {
    private readonly _auth: Auth = inject(Auth);

    async signInWithProvider(provider: AuthProvider): Promise<Token> {
        const providerGoogle = this._getAuthProvider(provider);

        const userCredential = await signInWithPopup(this._auth, providerGoogle);
        const tokenResult = await getIdTokenResult(userCredential.user);

        return TokenMapper.toDomain(tokenResult);
    }

    private _authProviders = {
        'google.com': new GoogleAuthProvider(),
        'facebook.com': new FacebookAuthProvider(),
        'github.com': new GithubAuthProvider(),
    };

    private _getAuthProvider(provider: AuthProvider) {
        return this._authProviders[provider];
    }
}
