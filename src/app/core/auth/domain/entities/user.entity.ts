import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';
import { DisplayName } from '../value-objects/DisplayName';
import { PhotoURL } from '../value-objects/PhotoURL';
import { AuthProvider } from '../value-objects/AuthProvider';
import { Credits } from '../value-objects/Credits';

export interface UserProps {
    id: UserId;
    email: Email;
    displayName: DisplayName;
    photoURL?: PhotoURL;
    authProvider: AuthProvider;
    credits: Credits;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
    isEmailVerified: boolean;
    isActive: boolean;
}

export class User {
    private constructor(private readonly props: UserProps) {}

    static create(props: UserProps): User {
        return new User({
            ...props,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
            isEmailVerified: props.isEmailVerified ?? false,
            isActive: props.isActive ?? true,
            credits: props.credits || Credits.createDefault(),
            photoURL: props.photoURL || PhotoURL.createEmpty(),
        });
    }

    static createNew(
        id: UserId,
        email: Email,
        displayName: DisplayName,
        authProvider: AuthProvider,
        photoURL?: PhotoURL
    ): User {
        const now = new Date();
        return new User({
            id,
            email,
            displayName,
            photoURL: photoURL || PhotoURL.createEmpty(),
            authProvider,
            credits: Credits.createDefault(),
            createdAt: now,
            updatedAt: now,
            lastLoginAt: now,
            isEmailVerified: authProvider.isGoogle, // Google users are pre-verified
            isActive: true,
        });
    }

    // Getters
    get id(): UserId {
        return this.props.id;
    }

    get email(): Email {
        return this.props.email;
    }

    get displayName(): DisplayName {
        return this.props.displayName;
    }

    get photoURL(): PhotoURL {
        return this.props.photoURL!;
    }

    get authProvider(): AuthProvider {
        return this.props.authProvider;
    }

    get credits(): Credits {
        return this.props.credits;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    get lastLoginAt(): Date | undefined {
        return this.props.lastLoginAt;
    }

    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    // Business logic methods
    get canUseService(): boolean {
        return this.isActive && this.isEmailVerified;
    }

    get hasPhoto(): boolean {
        return !this.photoURL.isEmpty && this.photoURL.isValid;
    }

    get initials(): string {
        return this.displayName.initials;
    }

    get firstName(): string {
        return this.displayName.firstName;
    }

    updateLastLogin(): User {
        return new User({
            ...this.props,
            lastLoginAt: new Date(),
            updatedAt: new Date(),
        });
    }

    updateCredits(newCredits: Credits): User {
        return new User({
            ...this.props,
            credits: newCredits,
            updatedAt: new Date(),
        });
    }

    consumeCredits(amount: number = 1): User {
        const newCredits = this.credits.consume(amount);
        return this.updateCredits(newCredits);
    }

    addCredits(amount: number): User {
        const newCredits = this.credits.add(amount);
        return this.updateCredits(newCredits);
    }

    resetCredits(): User {
        const newCredits = this.credits.reset();
        return this.updateCredits(newCredits);
    }

    updateProfile(displayName?: DisplayName, photoURL?: PhotoURL): User {
        return new User({
            ...this.props,
            displayName: displayName || this.displayName,
            photoURL: photoURL || this.photoURL,
            updatedAt: new Date(),
        });
    }

    verifyEmail(): User {
        return new User({
            ...this.props,
            isEmailVerified: true,
            updatedAt: new Date(),
        });
    }

    deactivate(): User {
        return new User({
            ...this.props,
            isActive: false,
            updatedAt: new Date(),
        });
    }

    activate(): User {
        return new User({
            ...this.props,
            isActive: true,
            updatedAt: new Date(),
        });
    }

    equals(other: User): boolean {
        return this.id.equals(other.id);
    }

    toJSON(): Record<string, any> {
        return {
            id: this.id.value,
            email: this.email.value,
            displayName: this.displayName.value,
            photoURL: this.photoURL.value,
            authProvider: this.authProvider.value,
            credits: {
                current: this.credits.current,
                maximum: this.credits.maximum,
            },
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            lastLoginAt: this.lastLoginAt?.toISOString(),
            isEmailVerified: this.isEmailVerified,
            isActive: this.isActive,
        };
    }
}
