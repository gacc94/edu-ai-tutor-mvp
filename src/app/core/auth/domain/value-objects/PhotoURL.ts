export class PhotoURL {
    private readonly _value: string | null;

    private constructor(photoURL?: string) {
        if (!photoURL) {
            this._value = null;
            return;
        }

        try {
            new URL(photoURL);
            this._value = photoURL;
        } catch (error) {
            throw new Error('Invalid URL format for photo');
        }
    }

    static create(photoURL?: string): PhotoURL {
        return new PhotoURL(photoURL);
    }

    get value(): string | null {
        return this._value;
    }

    equals(other: PhotoURL): boolean {
        return this._value === other.value;
    }

    toString(): string | null {
        return this._value;
    }

    hasValue(): boolean {
        return this._value !== null;
    }
}
