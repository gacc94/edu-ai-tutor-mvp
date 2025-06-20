import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';
import { DisplayName } from '../value-objects/DisplayName';
import { PhotoURL } from '../value-objects/PhotoURL';
import { Credits } from '../value-objects/Credits';
import { AuthProvider } from '../value-objects/AuthProvider';

export interface UserProps {
    id: UserId;
    email: Email;
    displayName?: DisplayName;
    photoURL?: PhotoURL;
    credits: Credits;
    maxCredits: number;
    createdAt: Date;
    updatedAt: Date;
    isEmailVerified: boolean;
    provider: AuthProvider;
}

export class User {
    private constructor(private readonly props: UserProps) {}

    // Getters
    get id(): UserId {
        return this.props.id;
    }

    get email(): Email {
        return this.props.email;
    }

    get displayName(): DisplayName | undefined {
        return this.props.displayName;
    }

    get photoURL(): PhotoURL | undefined {
        return this.props.photoURL;
    }

    get credits(): Credits {
        return this.props.credits;
    }

    get maxCredits(): number {
        return this.props.maxCredits;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }

    get provider(): AuthProvider {
        return this.props.provider;
    }

    get hasCredits(): boolean {
        return !this.credits.isZero();
    }

    get creditsPercentage(): number {
        return this.credits.percentage;
    }

    // Business Logic Methods
    updateCredits(amount: number): User {
        const newCredits = amount >= 0 
            ? this.credits.add(amount)
            : this.credits.subtract(Math.abs(amount));

        return this.clone({
            credits: newCredits,
            updatedAt: new Date()
        });
    }

    updateProfile(displayName?: string, photoURL?: string): User {
        return this.clone({
            displayName: displayName ? DisplayName.create(displayName) : this.displayName,
            photoURL: photoURL !== undefined ? PhotoURL.create(photoURL) : this.photoURL,
            updatedAt: new Date()
        });
    }

    verifyEmail(): User {
        if (this.isEmailVerified) {
            return this;
        }
        
        return this.clone({
            isEmailVerified: true,
            updatedAt: new Date()
        });
    }

    // Utility Methods
    protected clone(updates: Partial<UserProps>): User {
        return new User({
            ...this.props,
            ...updates
        });
    }

    // Factory method for creating new users
    static create(props: Omit<UserProps, 'createdAt' | 'updatedAt'> & { isEmailVerified?: boolean }): User {
        const now = new Date();
        return new User({
            ...props,
            isEmailVerified: props.isEmailVerified ?? false,
            createdAt: now,
            updatedAt: now
        });
    }

    // Factory method for creating user instances (used by UserFactory)
    static createInstance(props: UserProps): User {
        return new User(props);
    }
}
