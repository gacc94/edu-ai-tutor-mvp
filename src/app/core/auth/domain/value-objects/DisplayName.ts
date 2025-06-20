export class DisplayName {
    private readonly _value: string;

    private constructor(displayName: string) {
        if (!displayName || displayName.trim() === '') {
            throw new Error('Display name cannot be empty');
        }
        
        if (displayName.length < 2 || displayName.length > 50) {
            throw new Error('Display name must be between 2 and 50 characters');
        }
        
        this._value = displayName.trim();
    }

    static create(displayName: string): DisplayName {
        return new DisplayName(displayName);
    }

    get value(): string {
        return this._value;
    }

    equals(other: DisplayName): boolean {
        return this._value === other.value;
    }

    toString(): string {
        return this._value;
    }
}
