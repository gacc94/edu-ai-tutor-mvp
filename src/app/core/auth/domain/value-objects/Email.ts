export class Email {
    private readonly _value: string;

    private constructor(email: string) {
        if (!email || email.trim() === '') {
            throw new Error('Email cannot be empty');
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        
        this._value = email.toLowerCase();
    }

    static create(email: string): Email {
        return new Email(email);
    }

    get value(): string {
        return this._value;
    }

    equals(other: Email): boolean {
        return this._value === other.value;
    }

    toString(): string {
        return this._value;
    }
}
