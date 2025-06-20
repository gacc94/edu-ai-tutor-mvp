export type AuthProviderType = 'google' | 'email';

export class AuthProvider {
    private static readonly VALID_PROVIDERS: ReadonlyArray<AuthProviderType> = ['google', 'email'] as const;
    private readonly _value: AuthProviderType;

    private constructor(provider: AuthProviderType) {
        if (!AuthProvider.VALID_PROVIDERS.includes(provider)) {
            throw new Error(`Invalid auth provider. Must be one of: ${AuthProvider.VALID_PROVIDERS.join(', ')}`);
        }
        this._value = provider;
    }

    static create(provider: AuthProviderType): AuthProvider {
        return new AuthProvider(provider);
    }

    get value(): AuthProviderType {
        return this._value;
    }

    equals(other: AuthProvider): boolean {
        return this._value === other.value;
    }

    toString(): string {
        return this._value;
    }

    static get GOOGLE(): AuthProvider {
        return new AuthProvider('google');
    }

    static get EMAIL(): AuthProvider {
        return new AuthProvider('email');
    }
}
