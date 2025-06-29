export class PhotoUrlVO {
    private constructor(private readonly _value: string) {}

    static create(value: string): PhotoUrlVO {
        if (!(value !== '' && (value.startsWith('http://') || value.startsWith('https://')))) {
            throw new Error('Invalid photo URL format');
        }
        return new PhotoUrlVO(value);
    }

    static createEmpty(): PhotoUrlVO {
        return new PhotoUrlVO('');
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
