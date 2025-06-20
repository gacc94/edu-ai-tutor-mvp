import { Injectable, Inject } from '@angular/core';
import { USER_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState } from '../states/interfaces/user.state';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '@core/auth/domain/entities/user.entity';

@Injectable({ providedIn: 'root' })
export class GetCurrentUserUseCase {
    constructor(@Inject(USER_STATE) private _userState: IStateStorage<UserState>) {}

    execute(): User | null {
        const userState = this._userState.$state();
        return userState ? UserMapper.toDomain(userState) : null;
    }
}
