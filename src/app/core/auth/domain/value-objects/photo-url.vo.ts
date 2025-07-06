export class PhotoUrlVO {
    private _value: string;

    constructor(value: string) {
        const sanitizer = value.trim();

        if (!sanitizer) {
            throw new Error('Photo URL cannot be empty');
        }

        if (!(sanitizer !== '' && (sanitizer.startsWith('http://') || sanitizer.startsWith('https://')))) {
            throw new Error('Invalid photo URL format');
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
