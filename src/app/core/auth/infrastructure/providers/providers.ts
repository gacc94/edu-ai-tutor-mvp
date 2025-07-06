import { InjectionToken } from '@angular/core';
import { FirebaseAuthRepository } from '../http/firebase-auth.repository';
import { UserAuthRepository } from '../http/user-auth.repository';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { StateStorageRepository } from '@shared/storage/services/state-storage.repository';
import { ITokenState } from '../states/interfaces/token.state';
import { IAuthPort } from '@core/auth/domain/ports/auth.port';
import { IUserAuthPort } from '@core/auth/domain/ports/user-auth.port';
import { SignInWithProviderUseCase } from '@core/auth/application/use-cases/sign-in-with-provider.use-case';
import { UserAuthUseCase } from '@core/auth/application/use-cases/user-auth.use-case';
import { IUserAuthUseCase, ISignInWithProviderUseCase } from '@core/auth/application/interfaces';
import { IUserState } from '../states/interfaces/user.state';

/*
 * ========================================================================================
 *                                      REPOSITORIES
 * ========================================================================================
 */
export const AUTH_REPOSITORY = new InjectionToken<IAuthPort>('AuthRepository', {
    providedIn: 'root',
    factory: () => new FirebaseAuthRepository(),
});

export const USER_AUTH_REPOSITORY = new InjectionToken<IUserAuthPort>('UserAuthRepository', {
    providedIn: 'root',
    factory: () => new UserAuthRepository(),
});

/*
 * ========================================================================================
 *                                      USE CASES
 * ========================================================================================
 */

export const SIGN_IN_WITH_PROVIDER_USE_CASE = new InjectionToken<ISignInWithProviderUseCase>('SIGN_IN_WITH_PROVIDER_USE_CASE', {
    providedIn: 'root',
    factory: () => new SignInWithProviderUseCase(),
});

export const USER_AUTH_USE_CASE = new InjectionToken<IUserAuthUseCase>('UserAuthUseCase', {
    providedIn: 'root',
    factory: () => new UserAuthUseCase(),
});

/*
 * ========================================================================================
 *                                      STATES
 * ========================================================================================
 */

export const TOKEN_STATE = new InjectionToken<IStateStorage<ITokenState>>('TOKEN_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<ITokenState>('tokenState'),
});

export const USER_STATE = new InjectionToken<IStateStorage<IUserState>>('USER_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<IUserState>('userState'),
});
