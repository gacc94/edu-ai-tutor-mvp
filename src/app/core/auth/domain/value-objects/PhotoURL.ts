export class PhotoURL {
    private constructor(private readonly _value: string) {
        this.validate(_value);
    }

    static create(value: string): PhotoURL {
        return new PhotoURL(value);
    }

    static createEmpty(): PhotoURL {
        return new PhotoURL('');
    }

    get value(): string {
        return this._value;
    }

    get isEmpty(): boolean {
        return this._value === '';
    }

    get isValid(): boolean {
        return this._value !== '' && this.isValidUrl(this._value);
    }

    private validate(value: string): void {
        if (value !== '' && !this.isValidUrl(value)) {
            throw new Error('Invalid photo URL format');
        }
    }

    private isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    equals(other: PhotoURL): boolean {
        return this._value === other._value;
    }

    toString(): string {
        return this._value;
    }
}
