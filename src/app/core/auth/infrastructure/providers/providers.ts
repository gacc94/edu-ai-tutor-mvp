import { HttpClient } from '@angular/common/http';
import { InjectionToken, inject } from '@angular/core';
import { FirebaseAuthRepository } from '../repositories/firebase-auth.repository';
import { IAuthRepository } from '@core/auth/domain/repositories/auth.repository';
import { UserAuthRepository } from '../repositories/user-auth.repository';
import { IUserAuthRepository } from '@core/auth/domain/repositories/user-auth.repository';

export const AUTH_REPOSITORY = new InjectionToken<IAuthRepository>('AuthRepository', {
    providedIn: 'root',
    factory: () => new FirebaseAuthRepository(),
});

export const USER_AUTH_REPOSITORY = new InjectionToken<IUserAuthRepository>('UserAuthRepository', {
    providedIn: 'root',
    factory: () => new UserAuthRepository(inject(HttpClient)),
});
