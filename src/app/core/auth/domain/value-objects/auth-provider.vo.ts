import { AuthProvider } from '../enums';

export class AuthProviderVO {
    private readonly _value: string;

    constructor(value: string) {
        if (!Object.values(AuthProvider).includes(value as AuthProvider)) {
            throw new Error('Invalid auth provider');
        }

        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    equals(other: AuthProviderVO): boolean {
        return this._value === other._value;
    }

    toString(): string {
        return this._value;
    }
}
