import { User, UserProps } from '../entities/user.entity';
import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';
import { DisplayName } from '../value-objects/DisplayName';
import { PhotoURL } from '../value-objects/PhotoURL';
import { Credits } from '../value-objects/Credits';
import { AuthProvider } from '../value-objects/AuthProvider';
import { User as FirebaseUser } from 'firebase/auth';

/**
 * Factory for creating User domain objects
 */

export interface CreateUserParams {
    email: string;
    displayName?: string;
    photoURL?: string;
    credits?: number;
    maxCredits?: number;
    provider?: 'google' | 'email';
    isEmailVerified?: boolean;
}

export class UserFactory {
    private constructor() {}
    
    /**
     * Default maximum credits for new users
     */
    private static readonly DEFAULT_MAX_CREDITS = 100;
    /**
     * Creates a new user with the provided parameters
     * @param params User creation parameters
     * @returns A new User instance
     */
    static create(params: CreateUserParams): User {
        const now = new Date();
        const maxCredits = params.maxCredits ?? 100; // Default max credits
        const credits = params.credits ?? 0;
        const isEmailVerified = params.isEmailVerified ?? false;
        
        // Create user with required properties
        let user = User.create({
            id: UserId.create(),
            email: Email.create(params.email),
            credits: Credits.create(credits, maxCredits > 0 ? maxCredits : this.DEFAULT_MAX_CREDITS),
            maxCredits: maxCredits > 0 ? maxCredits : this.DEFAULT_MAX_CREDITS,
            provider: params.provider ? AuthProvider.create(params.provider) : AuthProvider.EMAIL,
            isEmailVerified,
            displayName: params.displayName ? DisplayName.create(params.displayName) : undefined,
            photoURL: params.photoURL ? PhotoURL.create(params.photoURL) : undefined
        });
        
        return user;
    }

    /**
     * Creates a new User instance based on an existing user with updates
     * @param user The existing user
     * @param updates The updates to apply
     * @returns A new User instance with updated properties
     */
    static createFromExisting(user: User, updates: Partial<CreateUserParams>): User {
        const updatedProps: Partial<UserProps> = {
            ...user,
            updatedAt: new Date()
        };
        
        // Update email if provided
        if (updates.email) {
            updatedProps.email = Email.create(updates.email);
        }
        
        // Update credits if provided
        if (updates.credits !== undefined || updates.maxCredits !== undefined) {
            const newMaxCredits = updates.maxCredits ?? user.maxCredits;
            const newCredits = updates.credits ?? user.credits.value;
            updatedProps.credits = Credits.create(newCredits, newMaxCredits);
            updatedProps.maxCredits = newMaxCredits;
        }
        
        // Update provider if provided
        if (updates.provider) {
            updatedProps.provider = AuthProvider.create(updates.provider);
        }
        
        // Update email verification status if provided
        if (updates.isEmailVerified !== undefined) {
            updatedProps.isEmailVerified = updates.isEmailVerified;
        }
        
        // Update displayName if provided
        if (updates.displayName !== undefined) {
            updatedProps.displayName = updates.displayName 
                ? DisplayName.create(updates.displayName) 
                : undefined;
        }
        
        // Update photoURL if provided
        if (updates.photoURL !== undefined) {
            updatedProps.photoURL = updates.photoURL 
                ? PhotoURL.create(updates.photoURL) 
                : undefined;
        }
        
        // Create a new user with updated properties
        return User.create({
            id: updatedProps.id!,
            email: updatedProps.email!,
            credits: updatedProps.credits!,
            maxCredits: updatedProps.maxCredits!,
            provider: updatedProps.provider!,
            isEmailVerified: updatedProps.isEmailVerified!,
            displayName: updatedProps.displayName,
            photoURL: updatedProps.photoURL
        });
    }

    /**
     * Creates a User instance from a Firebase User object
     * @param firebaseUser The Firebase user object
     * @param provider The authentication provider
     * @returns A new User instance
     * @throws Error if the Firebase user doesn't have an email
     */
    static createFromFirebaseUser(firebaseUser: FirebaseUser, provider: 'google' | 'email' = 'email'): User {
        const email = firebaseUser.email;
        if (!email) {
            throw new Error('Firebase user must have an email');
        }
        
        // Create user with all properties from Firebase
        return User.create({
            id: UserId.fromString(firebaseUser.uid),
            email: Email.create(email),
            credits: Credits.create(0, this.DEFAULT_MAX_CREDITS),
            maxCredits: this.DEFAULT_MAX_CREDITS,
            provider: AuthProvider.create(provider),
            isEmailVerified: firebaseUser.emailVerified,
            displayName: firebaseUser.displayName ? DisplayName.create(firebaseUser.displayName) : undefined,
            photoURL: firebaseUser.photoURL ? PhotoURL.create(firebaseUser.photoURL) : undefined
        });
    }
}
