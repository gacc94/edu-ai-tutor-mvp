import { Injectable } from '@angular/core';
import { SignInWithGoogleUseCase } from '../uses-cases/sign-in-with-google.use-case';
import { UserAuthUseCase } from '../uses-cases/user-auth.use-case';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private readonly _signInWithGoogleUseCase: SignInWithGoogleUseCase,
        private readonly _userAuthUseCase: UserAuthUseCase
    ) {}

    async signInWithGoogle() {
        await this._signInWithGoogleUseCase.execute();
        return this._userAuthUseCase.execute();
    }
}
