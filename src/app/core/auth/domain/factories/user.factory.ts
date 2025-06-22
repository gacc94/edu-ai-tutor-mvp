import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';
import { DisplayName } from '../value-objects/DisplayName';
import { PhotoURL } from '../value-objects/PhotoURL';
import { AuthProvider } from '../value-objects/AuthProvider';
import { Credits } from '../value-objects/Credits';

export interface CreateUserFromGoogleProps {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
}

export interface CreateUserFromDataProps {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
    authProvider: string;
    currentCredits: number;
    maxCredits: number;
    createdAt: string | Date;
    updatedAt: string | Date;
    lastLoginAt?: string | Date;
    isEmailVerified: boolean;
    isActive: boolean;
}

export class UserFactory {
    static createFromGoogle(props: CreateUserFromGoogleProps): User {
        return User.createNew(
            UserId.create(props.uid),
            Email.create(props.email),
            DisplayName.create(props.displayName),
            AuthProvider.google(),
            props.photoURL ? PhotoURL.create(props.photoURL) : PhotoURL.createEmpty()
        );
    }

    static createFromData(props: CreateUserFromDataProps): User {
        return User.create({
            id: UserId.create(props.id),
            email: Email.create(props.email),
            displayName: DisplayName.create(props.displayName),
            photoURL: props.photoURL ? PhotoURL.create(props.photoURL) : PhotoURL.createEmpty(),
            authProvider: AuthProvider.fromString(props.authProvider),
            credits: Credits.create(props.currentCredits, props.maxCredits),
            createdAt: typeof props.createdAt === 'string' ? new Date(props.createdAt) : props.createdAt,
            updatedAt: typeof props.updatedAt === 'string' ? new Date(props.updatedAt) : props.updatedAt,
            lastLoginAt: props.lastLoginAt
                ? typeof props.lastLoginAt === 'string'
                    ? new Date(props.lastLoginAt)
                    : props.lastLoginAt
                : undefined,
            isEmailVerified: props.isEmailVerified,
            isActive: props.isActive,
        });
    }

    static createGuest(): User {
        const now = new Date();
        return User.create({
            id: UserId.create('guest'),
            email: Email.create('guest@eduaitutor.com'),
            displayName: DisplayName.create('Guest User'),
            photoURL: PhotoURL.createEmpty(),
            authProvider: AuthProvider.anonymous(),
            credits: Credits.createEmpty(),
            createdAt: now,
            updatedAt: now,
            isEmailVerified: false,
            isActive: false,
        });
    }
}
