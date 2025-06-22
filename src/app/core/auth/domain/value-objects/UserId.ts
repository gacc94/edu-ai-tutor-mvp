export class UserId {
    private constructor(private readonly _value: string) {
        this.validate(_value);
    }

    static create(value: string): UserId {
        return new UserId(value);
    }

    get value(): string {
        return this._value;
    }

    private validate(value: string): void {
        if (!value || value.trim().length === 0) {
            throw new Error('UserId cannot be empty');
        }
        if (value.length < 3) {
            throw new Error('UserId must be at least 3 characters long');
        }
    }

    equals(other: UserId): boolean {
        return this._value === other._value;
    }

    toString(): string {
        return this._value;
    }
}
