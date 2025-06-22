import { User } from '@core/auth/domain/entities/user.entity';
import { UserState } from '../states/interfaces/user.state';
import { UserFactory } from '@core/auth/domain/factories/user.factory';

export class UserMapper {
    static toState(user: User): UserState {
        return {
            id: user.id.value,
            email: user.email.value,
            displayName: user.displayName.value,
            photoURL: user.photoURL.isEmpty ? undefined : user.photoURL.value,
            authProvider: user.authProvider.value,
            currentCredits: user.credits.current,
            maxCredits: user.credits.maximum,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            lastLoginAt: user.lastLoginAt?.toISOString(),
            isEmailVerified: user.isEmailVerified,
            isActive: user.isActive,
        };
    }

    static toDomain(state: UserState): User {
        return UserFactory.createFromData({
            id: state.id,
            email: state.email,
            displayName: state.displayName,
            photoURL: state.photoURL,
            authProvider: state.authProvider,
            currentCredits: state.currentCredits,
            maxCredits: state.maxCredits,
            createdAt: state.createdAt,
            updatedAt: state.updatedAt,
            lastLoginAt: state.lastLoginAt,
            isEmailVerified: state.isEmailVerified,
            isActive: state.isActive,
        });
    }
}
