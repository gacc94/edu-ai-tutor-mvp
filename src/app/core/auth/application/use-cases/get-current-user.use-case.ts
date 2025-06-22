import { Injectable, Inject } from '@angular/core';
import { AuthRepository } from '@core/auth/domain/repositories/auth.repository';
import { UserRepository } from '@core/auth/domain/repositories/user.repository';
import { FIREBASE_AUTH_REPOSITORY } from '@core/auth/infrastructure/providers/auth.provider';
import { FIRESTORE_USER_REPOSITORY } from '@core/auth/infrastructure/providers/user.provider';
import { USER_STATE, AUTH_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState, AuthState } from '../states/interfaces';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '@core/auth/domain/entities/user.entity';

@Injectable({ providedIn: 'root' })
export class GetCurrentUserUseCase {
    constructor(
        @Inject(FIREBASE_AUTH_REPOSITORY) private _authRepository: AuthRepository,
        @Inject(FIRESTORE_USER_REPOSITORY) private _userRepository: UserRepository,
        @Inject(USER_STATE) private _userState: IStateStorage<UserState>,
        @Inject(AUTH_STATE) private _authState: IStateStorage<AuthState>
    ) {}

    async execute(): Promise<User | null> {
        try {
            const currentUser = await this._authRepository.getCurrentUser();

            if (!currentUser) {
                await this._clearStates();
                return null;
            }

            // Get fresh user data from Firestore
            const firestoreUser = await this._userRepository.findById(currentUser.id);
            const user = firestoreUser || currentUser;

            // Update states
            const userState = UserMapper.toState(user);
            await this._userState.save(userState);

            await this._authState.save({
                isAuthenticated: true,
                isLoading: false,
                user: userState,
                error: null,
            });

            return user;
        } catch (error) {
            await this._clearStates();
            throw error;
        }
    }

    private async _clearStates(): Promise<void> {
        await this._userState.clear();
        await this._authState.save({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: null,
        });
    }
}
