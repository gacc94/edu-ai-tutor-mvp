import { USER_AUTH_REPOSITORY } from '@core/auth/infrastructure/providers/providers';
import { inject } from '@angular/core';
import { IUserAuthUseCase } from '@core/auth/application/interfaces/user-auth-use-case';
import { UserMapper } from '@core/auth/infrastructure/mappers/user.mapper';
import { USER_STATE } from '@core/auth/infrastructure/providers/providers';

export class UserAuthUseCase implements IUserAuthUseCase {
    private readonly _userAuthRepository = inject(USER_AUTH_REPOSITORY);
    private readonly _userState = inject(USER_STATE);

    async execute() {
        const userAuthResult = await this._userAuthRepository.signIn();

        console.log(userAuthResult.user.lastLoginAt.value.toDate());

        await this._userState.save(UserMapper.toState(userAuthResult.user));

        return userAuthResult;
    }
}
