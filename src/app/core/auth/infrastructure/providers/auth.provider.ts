import { InjectionToken } from '@angular/core';
import { AuthRepository } from '@core/auth/domain/repositories/auth.repository';
import { UserRepository } from '@core/auth/domain/repositories/user.repository';
import { FirebaseAuthRepository } from '../repositories/firebase-auth.repository';
import { FirestoreUserRepository } from '../repositories/firestore-user.repository';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AuthRepository', {
    providedIn: 'root',
    factory: () => new FirebaseAuthRepository(),
});

export const USER_REPOSITORY = new InjectionToken<UserRepository>('UserRepository', {
    providedIn: 'root',
    factory: () => new FirestoreUserRepository(),
});
