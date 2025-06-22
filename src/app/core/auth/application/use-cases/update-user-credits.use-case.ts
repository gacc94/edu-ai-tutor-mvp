import { Injectable, Inject } from '@angular/core';
import { UserRepository } from '@core/auth/domain/repositories/user.repository';
import { FIRESTORE_USER_REPOSITORY } from '@core/auth/infrastructure/providers/user.provider';
import { USER_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState } from '../states/interfaces';
import { UserMapper } from '../mappers/user.mapper';
import { Credits } from '@core/auth/domain/value-objects/Credits';

@Injectable({ providedIn: 'root' })
export class UpdateUserCreditsUseCase {
    constructor(
        @Inject(FIRESTORE_USER_REPOSITORY) private _userRepository: UserRepository,
        @Inject(USER_STATE) private _userState: IStateStorage<UserState>
    ) {}

    async execute(currentCredits: number, maxCredits?: number): Promise<void> {
        const userState = this._userState.$state();
        if (!userState) {
            throw new Error('No user found');
        }

        const user = UserMapper.toDomain(userState);
        const newCredits = maxCredits
            ? Credits.create(currentCredits, maxCredits)
            : Credits.create(currentCredits, user.credits.maximum);

        const updatedUser = user.updateCredits(newCredits);

        // Update in Firestore
        await this._userRepository.update(updatedUser);

        // Update state
        const updatedUserState = UserMapper.toState(updatedUser);
        await this._userState.save(updatedUserState);
    }
}
