import { Injectable, Inject } from '@angular/core';
import { UserRepository } from '@core/auth/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@core/auth/infrastructure/providers/auth.provider';
import { USER_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState } from '../states/interfaces/user.state';
import { UserMapper } from '../mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class UpdateUserCreditsUseCase {
    constructor(
        @Inject(USER_REPOSITORY) private _userRepository: UserRepository,
        @Inject(USER_STATE) private _userState: IStateStorage<UserState>
    ) {}

    async execute(newCredits: number): Promise<void> {
        const userState = this._userState.$state();
        if (!userState) {
            throw new Error('No authenticated user found');
        }

        const user = UserMapper.toDomain(userState);
        const updatedUser = user.updateCredits(newCredits);

        // Update in Firestore
        await this._userRepository.updateUser(updatedUser);

        // Update local state
        const updatedUserState = UserMapper.toState(updatedUser);
        await this._userState.save(updatedUserState);
    }
}
