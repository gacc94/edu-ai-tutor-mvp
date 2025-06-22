export class DisplayName {
    private constructor(private readonly _value: string) {
        this.validate(_value);
    }

    static create(value: string): DisplayName {
        return new DisplayName(value);
    }

    get value(): string {
        return this._value;
    }

    get firstName(): string {
        return this._value.split(' ')[0];
    }

    get lastName(): string {
        const parts = this._value.split(' ');
        return parts.length > 1 ? parts.slice(1).join(' ') : '';
    }

    get initials(): string {
        return this._value
            .split(' ')
            .map((name) => name.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
    }

    private validate(value: string): void {
        if (!value || value.trim().length === 0) {
            throw new Error('DisplayName cannot be empty');
        }
        if (value.length < 2) {
            throw new Error('DisplayName must be at least 2 characters long');
        }
        if (value.length > 100) {
            throw new Error('DisplayName cannot exceed 100 characters');
        }
    }

    equals(other: DisplayName): boolean {
        return this._value === other._value;
    }

    toString(): string {
        return this._value;
    }
}
