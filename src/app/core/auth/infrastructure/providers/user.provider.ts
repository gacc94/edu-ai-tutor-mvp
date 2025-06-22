import { InjectionToken } from '@angular/core';
import { UserRepository } from '@core/auth/domain/repositories/user.repository';
import { FirestoreUserRepository } from '../repositories/firestore-user.repository';

export const FIRESTORE_USER_REPOSITORY = new InjectionToken<UserRepository>('UserRepository', {
    providedIn: 'root',
    factory: () => {
        // This will be injected by Angular's DI system
        return new FirestoreUserRepository(null as any);
    },
});
