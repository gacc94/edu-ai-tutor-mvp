export enum AuthProviderType {
    GOOGLE = 'google',
    EMAIL = 'email',
    ANONYMOUS = 'anonymous',
}

export class AuthProvider {
    private constructor(private readonly _value: AuthProviderType) {}

    static google(): AuthProvider {
        return new AuthProvider(AuthProviderType.GOOGLE);
    }

    static email(): AuthProvider {
        return new AuthProvider(AuthProviderType.EMAIL);
    }

    static anonymous(): AuthProvider {
        return new AuthProvider(AuthProviderType.ANONYMOUS);
    }

    static fromString(value: string): AuthProvider {
        const providerType = Object.values(AuthProviderType).find((type) => type === value);
        if (!providerType) {
            throw new Error(`Invalid auth provider: ${value}`);
        }
        return new AuthProvider(providerType);
    }

    get value(): AuthProviderType {
        return this._value;
    }

    get isGoogle(): boolean {
        return this._value === AuthProviderType.GOOGLE;
    }

    get isEmail(): boolean {
        return this._value === AuthProviderType.EMAIL;
    }

    get isAnonymous(): boolean {
        return this._value === AuthProviderType.ANONYMOUS;
    }

    equals(other: AuthProvider): boolean {
        return this._value === other._value;
    }

    toString(): string {
        return this._value;
    }
}
