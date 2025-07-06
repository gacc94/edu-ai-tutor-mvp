export class DisplayNameVO {
    private readonly _value: string;

    constructor(value: string) {
        const sanitized = value.trim();

        if (!sanitized) {
            throw new Error('DisplayName cannot be empty');
        }
        if (sanitized.length < 2) {
            throw new Error('DisplayName must be at least 2 characters long');
        }
        if (sanitized.length > 100) {
            throw new Error('DisplayName cannot exceed 100 characters');
        }

        this._value = sanitized;
    }

    get initials(): string {
        return this.value
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
