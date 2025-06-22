import { InjectionToken } from '@angular/core';
import { UserState, AuthState } from './interfaces';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { StateStorageRepository } from '@shared/storage/services/state-storage.repository';
import { storageKeys } from '@shared/utils/constants/storage-keys.constants';

export const USER_STATE = new InjectionToken<IStateStorage<UserState>>('USER_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<UserState>(storageKeys.user),
});

export const AUTH_STATE = new InjectionToken<IStateStorage<AuthState>>('AUTH_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<AuthState>(storageKeys.authState),
});
