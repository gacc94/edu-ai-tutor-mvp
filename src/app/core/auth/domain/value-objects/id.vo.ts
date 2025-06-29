export class IdVO {
    private constructor(private readonly _value: string) {}

    static create(value: string): IdVO {
        if (!value || value.trim().length === 0) {
            throw new Error('UserId cannot be empty');
        }
        if (value.length < 3) {
            throw new Error('UserId must be at least 3 characters long');
        }

        return new IdVO(value);
    }

    toString(): string {
        return this._value;
    }

    equals(other: IdVO): boolean {
        return this._value === other._value;
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
