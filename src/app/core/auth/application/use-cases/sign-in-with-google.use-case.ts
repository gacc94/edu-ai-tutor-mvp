import { Injectable, Inject } from '@angular/core';
import { AuthRepository, AuthResult } from '@core/auth/domain/repositories/auth.repository';
import { UserRepository } from '@core/auth/domain/repositories/user.repository';
import { AUTH_REPOSITORY, USER_REPOSITORY } from '@core/auth/infrastructure/providers/auth.provider';
import { USER_STATE, AUTH_TOKEN_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState } from '../states/interfaces/user.state';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '@core/auth/domain/entities/user.entity';
import { UserId } from '@core/auth/domain/value-objects/UserId';
import { UserFactory } from '@core/auth/domain/factories/user.factory';

@Injectable({ providedIn: 'root' })
export class SignInWithGoogleUseCase {
    constructor(
        @Inject(AUTH_REPOSITORY) private _authRepository: AuthRepository,
        @Inject(USER_REPOSITORY) private _userRepository: UserRepository,
        @Inject(USER_STATE) private _userState: IStateStorage<UserState>,
        @Inject(AUTH_TOKEN_STATE) private _tokenState: IStateStorage<string>
    ) {}

    async execute(): Promise<void> {
        const authResult = await this._authRepository.signInWithGoogle();
        const userId = authResult.user.id;

        try {
            // If it's a new user, create user in Firestore
            if (authResult.isNewUser) {
                await this._userRepository.createUser(authResult.user);
            } else {
                // If existing user, get updated data from Firestore
                const existingUser = await this._userRepository.getUserById(userId);
                if (existingUser) {
                    // Merge any additional data from Firestore with the authenticated user
                    const mergedUser = this.mergeUserData(authResult.user, existingUser);
                    await this._userRepository.updateUser(mergedUser);
                    authResult.user = mergedUser;
                }
            }

            // Save user state and token
            const userState = UserMapper.toState(authResult.user);
            await this._userState.save(userState);
            await this._tokenState.save(authResult.token);
        } catch (error) {
            console.error('Error during sign in with Google:', error);
            throw error;
        }
    }

    private mergeUserData(authUser: User, firestoreUser: User): User {
        // Create a new user instance with merged data
        // This ensures we don't lose any data from Firestore that might not be in the auth provider
        return User.createInstance({
            id: authUser.id,
            email: authUser.email,
            displayName: authUser.displayName || firestoreUser.displayName,
            photoURL: authUser.photoURL || firestoreUser.photoURL,
            credits: firestoreUser.credits,
            maxCredits: firestoreUser.maxCredits,
            provider: authUser.provider,
            isEmailVerified: authUser.isEmailVerified || firestoreUser.isEmailVerified,
            createdAt: firestoreUser.createdAt, // Keep the original creation date
            updatedAt: new Date(),
        });
    }
}
