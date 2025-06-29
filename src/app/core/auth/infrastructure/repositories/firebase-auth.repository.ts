import { GoogleAuthProvider, signInWithPopup, Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { IAuthRepository } from '@core/auth/domain/repositories/auth.repository';
import { ITokenState } from '@core/auth/application/states/interfaces/token.state';
import { TokenMapper } from '../mappers/token.mapper';

export class FirebaseAuthRepository implements IAuthRepository {
    private readonly _auth: Auth = inject(Auth);

    async signInWithGoogle(): Promise<ITokenState> {
        const providerGoogle = new GoogleAuthProvider();

        const credential = await signInWithPopup(this._auth, providerGoogle);
        const tokenResult = await credential.user.getIdTokenResult();
        return TokenMapper.toState(tokenResult);
    }
}
