import { Injectable, Inject } from '@angular/core';
import { AuthRepository, SignInResult } from '@core/auth/domain/repositories/auth.repository';
import { UserRepository } from '@core/auth/domain/repositories/user.repository';
import { FIREBASE_AUTH_REPOSITORY } from '@core/auth/infrastructure/providers/auth.provider';
import { FIRESTORE_USER_REPOSITORY } from '@core/auth/infrastructure/providers/user.provider';
import { USER_STATE, AUTH_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState, AuthState } from '../states/interfaces';
import { UserMapper } from '../mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class SignInWithGoogleUseCase {
    constructor(
        @Inject(FIREBASE_AUTH_REPOSITORY) private _authRepository: AuthRepository,
        @Inject(FIRESTORE_USER_REPOSITORY) private _userRepository: UserRepository,
        @Inject(USER_STATE) private _userState: IStateStorage<UserState>,
        @Inject(AUTH_STATE) private _authState: IStateStorage<AuthState>
    ) {}

    async execute(): Promise<SignInResult> {
        try {
            // Update loading state
            await this._updateAuthState({ isLoading: true, error: null });

            // Sign in with Google
            const result = await this._authRepository.signInWithGoogle();

            // Update user's last login
            const updatedUser = result.user.updateLastLogin();

            // Save/update user in Firestore
            if (result.isNewUser) {
                await this._userRepository.save(updatedUser);
            } else {
                await this._userRepository.update(updatedUser);
            }

            // Update states
            const userState = UserMapper.toState(updatedUser);
            await this._userState.save(userState);

            await this._updateAuthState({
                isAuthenticated: true,
                isLoading: false,
                user: userState,
                error: null,
            });

            return { ...result, user: updatedUser };
        } catch (error) {
            await this._updateAuthState({
                isAuthenticated: false,
                isLoading: false,
                user: null,
                error: error instanceof Error ? error.message : 'Sign in failed',
            });
            throw error;
        }
    }

    private async _updateAuthState(updates: Partial<AuthState>): Promise<void> {
        const currentState = this._authState.$state() || {
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: null,
        };

        await this._authState.save({ ...currentState, ...updates });
    }
}
