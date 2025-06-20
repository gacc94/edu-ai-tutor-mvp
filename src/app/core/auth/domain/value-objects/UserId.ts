import { v4 as uuidv4 } from 'uuid';

export class UserId {
    private readonly _value: string;

    private constructor(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('User ID cannot be empty');
        }
        // Add more validation if needed (e.g., format)
        this._value = value;
    }

    static create(value?: string): UserId {
        return new UserId(value || uuidv4());
    }

    static fromString(value: string): UserId {
        return new UserId(value);
    }

    get value(): string {
        return this._value;
    }

    equals(other: UserId): boolean {
        return this._value === other.value;
    }

    toString(): string {
        return this._value;
    }
}
