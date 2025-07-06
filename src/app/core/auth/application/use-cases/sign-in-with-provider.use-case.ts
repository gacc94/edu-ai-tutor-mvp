import { AUTH_REPOSITORY, TOKEN_STATE } from '@core/auth/infrastructure/providers/providers';
import { inject } from '@angular/core';
import { ISignInWithProviderUseCase } from '@core/auth/application/interfaces';
import { AuthProvider } from '@core/auth/domain/enums';
import { TokenMapper } from '@core/auth/infrastructure/mappers/token.mapper';

export class SignInWithProviderUseCase implements ISignInWithProviderUseCase {
    private readonly _firebaseAuthRepository = inject(AUTH_REPOSITORY);
    private readonly _tokenState = inject(TOKEN_STATE);

    async execute(provider: AuthProvider) {
        const token = await this._firebaseAuthRepository.signInWithProvider(provider);

        await this._tokenState.save(TokenMapper.toPersistence(token));

        return token;
    }
}
