export class EmailVO {
    private constructor(private readonly _value: string) {
        this.validate(_value);
    }

    static create(value: string): EmailVO {
        return new EmailVO(value);
    }

    toString(): string {
        return this._value;
    }

    equals(other: EmailVO): boolean {
        return this._value.toLowerCase() === other._value.toLowerCase();
    }

    /*
     * ========================================================================================
     *                                      PRIVATE METHODS
     * ========================================================================================*/

    private validate(value: string): void {
        if (!value || value.trim().length === 0) {
            throw new Error('Email cannot be empty');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Invalid email format');
        }
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
