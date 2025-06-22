export class Email {
    private constructor(private readonly _value: string) {
        this.validate(_value);
    }

    static create(value: string): Email {
        return new Email(value);
    }

    get value(): string {
        return this._value;
    }

    get domain(): string {
        return this._value.split('@')[1];
    }

    get localPart(): string {
        return this._value.split('@')[0];
    }

    private validate(value: string): void {
        if (!value || value.trim().length === 0) {
            throw new Error('Email cannot be empty');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Invalid email format');
        }
    }

    equals(other: Email): boolean {
        return this._value.toLowerCase() === other._value.toLowerCase();
    }

    toString(): string {
        return this._value;
    }
}
