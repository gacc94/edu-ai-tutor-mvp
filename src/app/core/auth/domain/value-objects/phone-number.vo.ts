export class PhoneNumberVO {
    private _value: string;

    constructor(value: string) {
        const sanitizer = value.trim();

        if (!sanitizer) {
            throw new Error('Phone number cannot be empty');
        }

        if (!(sanitizer !== '' && (sanitizer.startsWith('+') || sanitizer.startsWith('00')))) {
            throw new Error('Invalid phone number format');
        }

        this._value = sanitizer;
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
