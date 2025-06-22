export class Credits {
    private constructor(private readonly _current: number, private readonly _maximum: number) {
        this.validate(_current, _maximum);
    }

    static create(current: number, maximum: number): Credits {
        return new Credits(current, maximum);
    }

    static createDefault(): Credits {
        return new Credits(10, 10);
    }

    static createEmpty(): Credits {
        return new Credits(0, 10);
    }

    get current(): number {
        return this._current;
    }

    get maximum(): number {
        return this._maximum;
    }

    get percentage(): number {
        return Math.round((this._current / this._maximum) * 100);
    }

    get hasCredits(): boolean {
        return this._current > 0;
    }

    get isEmpty(): boolean {
        return this._current === 0;
    }

    get isFull(): boolean {
        return this._current === this._maximum;
    }

    get isLow(): boolean {
        return this._current <= Math.floor(this._maximum * 0.3); // 30% or less
    }

    consume(amount: number = 1): Credits {
        if (amount <= 0) {
            throw new Error('Amount to consume must be greater than 0');
        }
        if (this._current < amount) {
            throw new Error('Insufficient credits');
        }
        return new Credits(this._current - amount, this._maximum);
    }

    add(amount: number): Credits {
        if (amount <= 0) {
            throw new Error('Amount to add must be greater than 0');
        }
        const newCurrent = Math.min(this._current + amount, this._maximum);
        return new Credits(newCurrent, this._maximum);
    }

    reset(): Credits {
        return new Credits(this._maximum, this._maximum);
    }

    updateMaximum(newMaximum: number): Credits {
        if (newMaximum <= 0) {
            throw new Error('Maximum credits must be greater than 0');
        }
        const newCurrent = Math.min(this._current, newMaximum);
        return new Credits(newCurrent, newMaximum);
    }

    private validate(current: number, maximum: number): void {
        if (current < 0) {
            throw new Error('Current credits cannot be negative');
        }
        if (maximum <= 0) {
            throw new Error('Maximum credits must be greater than 0');
        }
        if (current > maximum) {
            throw new Error('Current credits cannot exceed maximum');
        }
    }

    equals(other: Credits): boolean {
        return this._current === other._current && this._maximum === other._maximum;
    }

    toString(): string {
        return `${this._current}/${this._maximum}`;
    }
}
