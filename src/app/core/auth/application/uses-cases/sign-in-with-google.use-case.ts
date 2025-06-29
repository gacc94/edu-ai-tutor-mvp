import { AUTH_REPOSITORY } from '@core/auth/infrastructure/providers/providers';
import { IAuthRepository } from '@core/auth/domain/repositories/auth.repository';
import { Injectable, Inject } from '@angular/core';
import { TOKEN_STATE } from '@core/auth/application/states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { ITokenState } from '@core/auth/application/states/interfaces/token.state';

@Injectable({
    providedIn: 'root',
})
export class SignInWithGoogleUseCase {
    constructor(
        @Inject(AUTH_REPOSITORY) private readonly _authRepository: IAuthRepository,
        @Inject(TOKEN_STATE) private readonly _authState: IStateStorage<ITokenState>
    ) {}

    async execute(): Promise<void> {
        const tokenResult = await this._authRepository.signInWithGoogle();

        await this._authState.save(tokenResult);
    }
}
