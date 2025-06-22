import { InjectionToken } from '@angular/core';
import { AuthRepository } from '@core/auth/domain/repositories/auth.repository';
import { FirebaseAuthRepository } from '../repositories/firebase-auth.repository';

export const FIREBASE_AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AuthRepository', {
    providedIn: 'root',
    factory: () => {
        // This will be injected by Angular's DI system
        return new FirebaseAuthRepository(null as any);
    },
});
