export class EmailVO {
    private readonly _value: string;

    constructor(value: string) {
        const email = value?.trim().toLowerCase();

        if (!email) {
            throw new Error('Email cannot be empty');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        this._value = email;
    }

    equals(other: EmailVO): boolean {
        return this._value.toLowerCase() === other._value.toLowerCase();
    }

    /*
     * ========================================================================================
     *                                      GETTERS
     * ========================================================================================*/

    get localPart(): string {
        return this._value.split('@')[0];
    }

    get domain(): string {
        return this._value.split('@')[1];
    }

    get value(): string {
        return this._value;
    }
}
