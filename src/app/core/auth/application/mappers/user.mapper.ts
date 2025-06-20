import { User } from '@core/auth/domain/entities/user.entity';
import { UserState } from '../states/interfaces/user.state';
import { UserId } from '@core/auth/domain/value-objects/UserId';
import { Email } from '@core/auth/domain/value-objects/Email';
import { DisplayName } from '@core/auth/domain/value-objects/DisplayName';
import { PhotoURL } from '@core/auth/domain/value-objects/PhotoURL';
import { Credits } from '@core/auth/domain/value-objects/Credits';
import { AuthProvider } from '@core/auth/domain/value-objects/AuthProvider';

export class UserMapper {
    /**
     * Converts a User domain entity to a UserState DTO
     * @param user The User domain entity
     * @returns A UserState DTO
     */
    static toState(user: User): UserState {
        return {
            uid: user.id.value,
            email: user.email.value,
            displayName: user.displayName?.value ?? null,
            photoURL: user.photoURL?.value ?? null,
            credits: user.credits.value,
            maxCredits: user.maxCredits,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            isEmailVerified: user.isEmailVerified,
            provider: user.provider.value as 'google' | 'email',
        };
    }

    /**
     * Converts a UserState DTO to a User domain entity
     * @param state The UserState DTO
     * @returns A User domain entity
     */
    static toDomain(state: UserState): User {
        return User.createInstance({
            id: UserId.fromString(state.uid),
            email: Email.create(state.email),
            displayName: state.displayName ? DisplayName.create(state.displayName) : undefined,
            photoURL: state.photoURL ? PhotoURL.create(state.photoURL) : undefined,
            credits: Credits.create(state.credits, state.maxCredits),
            maxCredits: state.maxCredits,
            provider: AuthProvider.create(state.provider),
            isEmailVerified: state.isEmailVerified,
            createdAt: new Date(state.createdAt),
            updatedAt: new Date(state.updatedAt)
        });
    }
}
