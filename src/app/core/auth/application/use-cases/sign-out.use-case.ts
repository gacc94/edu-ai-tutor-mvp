import { Injectable, Inject } from '@angular/core';
import { AuthRepository } from '@core/auth/domain/repositories/auth.repository';
import { FIREBASE_AUTH_REPOSITORY } from '@core/auth/infrastructure/providers/auth.provider';
import { USER_STATE, AUTH_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState, AuthState } from '../states/interfaces';

@Injectable({ providedIn: 'root' })
export class SignOutUseCase {
    constructor(
        @Inject(FIREBASE_AUTH_REPOSITORY) private _authRepository: AuthRepository,
        @Inject(USER_STATE) private _userState: IStateStorage<UserState>,
        @Inject(AUTH_STATE) private _authState: IStateStorage<AuthState>
    ) {}

    async execute(): Promise<void> {
        try {
            await this._authRepository.signOut();

            // Clear states
            await this._userState.clear();
            await this._authState.save({
                isAuthenticated: false,
                isLoading: false,
                user: null,
                error: null,
            });
        } catch (error) {
            throw new Error('Sign out failed');
        }
    }
}
