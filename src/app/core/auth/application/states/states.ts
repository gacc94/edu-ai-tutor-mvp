import { InjectionToken } from '@angular/core';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { StateStorageRepository } from '@shared/storage/services/state-storage.repository';
import { ITokenState } from './interfaces/token.state';

export const TOKEN_STATE = new InjectionToken<IStateStorage<ITokenState>>('TOKEN_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<ITokenState>('tokenState'),
});
