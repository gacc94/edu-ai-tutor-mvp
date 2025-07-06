export class IdVO {
    private readonly _value: string;

    constructor(value: string) {
        const sanitized = value.trim();

        if (!sanitized) {
            throw new Error('UserId cannot be empty');
        }

        if (sanitized.length < 3) {
            throw new Error('UserId must be at least 3 characters long');
        }

        this._value = sanitized;
    }

    equals(other: IdVO): boolean {
        return this._value === other.value;
    }

    toString(): string {
        return this._value;
    }

    /*
     * ========================================================================================
     *                                      GETTERS
     * ========================================================================================
     */

    get value(): string {
        return this._value;
    }
}

export interface User {
    uuid: string;
    email: string;
    displayName: string;
    photoURL: string;
    credits: {
        current: number;
        max: number;
    };
    provider: string;
    phoneNumber: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string;
    isActive: boolean;
}
