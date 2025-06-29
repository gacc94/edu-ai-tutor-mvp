export class DisplayNameVO {
    private constructor(private readonly _value: string) {}

    static create(value: string): DisplayNameVO {
        if (!value || value.trim().length === 0) {
            throw new Error('DisplayName cannot be empty');
        }
        if (value.length < 2) {
            throw new Error('DisplayName must be at least 2 characters long');
        }
        if (value.length > 100) {
            throw new Error('DisplayName cannot exceed 100 characters');
        }

        return new DisplayNameVO(value);
    }

    static createEmpty(): DisplayNameVO {
        return new DisplayNameVO('');
    }

    get initials(): string {
        return this._value
            .split(' ')
            .map((name) => name.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
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
