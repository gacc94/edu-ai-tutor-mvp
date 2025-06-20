import { User, UserProps } from '../entities/user.entity';
import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';
import { DisplayName } from '../value-objects/DisplayName';
import { PhotoURL } from '../value-objects/PhotoURL';
import { Credits } from '../value-objects/Credits';
import { AuthProvider } from '../value-objects/AuthProvider';
import { User as FirebaseUser } from 'firebase/auth';

/**
 * @deprecated Use UserFactory from './UserFactory' instead
 * This class is kept for backward compatibility and will be removed in a future version.
 */
export class UserFactory {
    private static readonly DEFAULT_CREDITS = 10;
    private static readonly DEFAULT_MAX_CREDITS = 10;

    /**
     * Creates a User instance from a Firebase User object
     * @deprecated Use UserFactory.createFromFirebaseUser from './UserFactory' instead
     */
    static createFromFirebaseUser(firebaseUser: FirebaseUser, provider: 'google' | 'email' = 'google'): User {
        console.warn('Deprecated: Use UserFactory.createFromFirebaseUser from \'./UserFactory\' instead');
        
        if (!firebaseUser.email) {
            throw new Error('Firebase user must have an email');
        }

        return User.create({
            id: UserId.fromString(firebaseUser.uid),
            email: Email.create(firebaseUser.email),
            displayName: firebaseUser.displayName ? DisplayName.create(firebaseUser.displayName) : undefined,
            photoURL: firebaseUser.photoURL ? PhotoURL.create(firebaseUser.photoURL) : undefined,
            credits: Credits.create(this.DEFAULT_CREDITS, this.DEFAULT_MAX_CREDITS),
            maxCredits: this.DEFAULT_MAX_CREDITS,
            isEmailVerified: firebaseUser.emailVerified,
            provider: AuthProvider.create(provider)
        });
    }

    /**
     * Creates a User instance from Firestore data
     * @deprecated Use UserMapper from the infrastructure layer instead
     */
    static createFromFirestoreData(data: any): User {
        console.warn('Deprecated: Use UserMapper from the infrastructure layer instead');
        
        if (!data.email) {
            throw new Error('User data must have an email');
        }

        return User.create({
            id: UserId.fromString(data.uid || data.id),
            email: Email.create(data.email),
            displayName: data.displayName ? DisplayName.create(data.displayName) : undefined,
            photoURL: data.photoURL ? PhotoURL.create(data.photoURL) : undefined,
            credits: Credits.create(data.credits || this.DEFAULT_CREDITS, data.maxCredits || this.DEFAULT_MAX_CREDITS),
            maxCredits: data.maxCredits || this.DEFAULT_MAX_CREDITS,
            isEmailVerified: data.isEmailVerified || false,
            provider: AuthProvider.create(data.provider || 'google')
        });
    }

    /**
     * Creates a default User instance
     * @deprecated Use UserFactory.create from './UserFactory' instead
     */
    static createDefault(uid: string, email: string): User {
        console.warn('Deprecated: Use UserFactory.create from \'./UserFactory\' instead');
        
        return User.create({
            id: UserId.fromString(uid),
            email: Email.create(email),
            credits: Credits.create(this.DEFAULT_CREDITS, this.DEFAULT_MAX_CREDITS),
            maxCredits: this.DEFAULT_MAX_CREDITS,
            isEmailVerified: false,
            provider: AuthProvider.EMAIL
        });
    }
}
