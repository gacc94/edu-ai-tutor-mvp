import { User } from '@core/auth/domain/entities';
import { UserFactory } from '@core/auth/domain/factories/user.factory';
import { UserDto, UserSchema } from '../schemas/user.schema';
import { IUserState } from '../states/interfaces/user.state';
import { Timestamp } from 'firebase/firestore';

export class UserMapper {
    /**
     * Convert a UserResponseDto to a User
     * @param dto
     * @returns
     */
    static toDomain(dto: UserDto): User {
        const user = UserSchema.parse(dto);
        return UserFactory.createFromProvider({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            authProvider: user.provider,
            isActive: true,
            credits: { ...user.credits },
            phoneNumber: user.phoneNumber,
            createdAt: new Timestamp(user.createdAt._seconds, user.createdAt._nanoseconds),
            updatedAt: new Timestamp(user.updatedAt._seconds, user.updatedAt._nanoseconds),
            lastLoginAt: new Timestamp(user.lastLoginAt._seconds, user.lastLoginAt._nanoseconds),
        });
    }

    static toState(user: User): IUserState {
        return {
            id: user.id.value,
            email: user.email.value,
            displayName: user.displayName.value,
            authProvider: user.authProvider.value,
            credits: {
                current: user.credits.current,
                max: user.credits.max,
            },
            emailVerified: user.emailVerified,
            isActive: user.isActive,
            photoURL: user.photoURL?.value ?? null,
            phoneNumber: user.phoneNumber?.value ?? null,
            createdAt: Timestamp.fromDate(user.createdAt.toDate()),
            updatedAt: Timestamp.fromDate(user.updatedAt.toDate()),
            lastLoginAt: Timestamp.fromDate(user.lastLoginAt.toDate()),
        };
    }

    static fromState(state: IUserState): User {
        return UserFactory.createFromProvider({
            id: state.id,
            email: state.email,
            displayName: state.displayName,
            photoURL: state.photoURL,
            emailVerified: state.emailVerified,
            authProvider: state.authProvider,
            isActive: state.isActive,
            credits: { ...state.credits },
            phoneNumber: state.phoneNumber,
            createdAt: Timestamp.fromDate(state.createdAt.toDate()),
            updatedAt: Timestamp.fromDate(state.updatedAt.toDate()),
            lastLoginAt: Timestamp.fromDate(state.lastLoginAt.toDate()),
        });
    }
}
