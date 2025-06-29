import { Injectable, Inject } from '@angular/core';
import { USER_AUTH_REPOSITORY } from '@core/auth/infrastructure/providers/providers';
import { IUserAuthRepository } from '@core/auth/domain/repositories/user-auth.repository';

@Injectable({
    providedIn: 'root',
})
export class UserAuthUseCase {
    constructor(@Inject(USER_AUTH_REPOSITORY) private readonly _userAuthRepository: IUserAuthRepository) {}

    async execute() {
        return await this._userAuthRepository.signIn();
    }
}
