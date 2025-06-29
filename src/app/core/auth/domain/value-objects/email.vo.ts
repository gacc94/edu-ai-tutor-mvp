export class EmailVO {
    private constructor(private readonly _value: string) {}

    static create(value: string): EmailVO {
        const email = value?.trim().toLowerCase();

        if (!email) {
            throw new Error('Email cannot be empty');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        return new EmailVO(email);
    }

    static createEmpty(): EmailVO {
        return new EmailVO('');
    }

    toString(): string {
        return this._value;
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
