import { Injectable, Inject } from '@angular/core';
import { AuthRepository } from '@core/auth/domain/repositories/auth.repository';
import { AUTH_REPOSITORY } from '@core/auth/infrastructure/providers/auth.provider';
import { USER_STATE, AUTH_TOKEN_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState } from '../states/interfaces/user.state';
import { IStateRegister } from '@shared/storage/interfaces/state-register.interface';
import { STATE_REGISTER_TOKEN } from '@shared/storage/providers/storage.provider';

@Injectable({ providedIn: 'root' })
export class SignOutUseCase {
    constructor(
        @Inject(AUTH_REPOSITORY) private _authRepository: AuthRepository,
        @Inject(USER_STATE) private _userState: IStateStorage<UserState>,
        @Inject(AUTH_TOKEN_STATE) private _tokenState: IStateStorage<string>,
        @Inject(STATE_REGISTER_TOKEN) private _stateRegister: IStateRegister
    ) {}

    async execute(): Promise<void> {
        await this._authRepository.signOut();

        // Clear all application state
        await this._stateRegister.clearAll();
    }
}
