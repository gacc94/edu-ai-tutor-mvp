export interface CreditsProps {
    current: number;
    maximum: number;
    lastReset?: Date;
}

export class Credits {
    private constructor(
        private readonly _current: number,
        private readonly _maximum: number,
        private readonly _lastReset?: Date
    ) {}

    static create(props: CreditsProps): Credits {
        if (props.current < 0) {
            throw new Error('Credits cannot be negative');
        }
        if (props.maximum <= 0) {
            throw new Error('Maximum credits must be greater than 0');
        }
        if (props.current > props.maximum) {
            throw new Error('Current credits cannot exceed maximum');
        }

        return new Credits(props.current, props.maximum, props.lastReset);
    }

    get current(): number {
        return this._current;
    }

    get maximum(): number {
        return this._maximum;
    }

    get lastReset(): Date | undefined {
        return this._lastReset;
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

    consume(amount: number = 1): Credits {
        if (amount <= 0) {
            throw new Error('Amount to consume must be greater than 0');
        }
        if (this._current < amount) {
            throw new Error('Insufficient credits');
        }

        return new Credits(this._current - amount, this._maximum, this._lastReset);
    }

    add(amount: number): Credits {
        if (amount <= 0) {
            throw new Error('Amount to add must be greater than 0');
        }

        const newCurrent = Math.min(this._current + amount, this._maximum);
        return new Credits(newCurrent, this._maximum, this._lastReset);
    }

    reset(): Credits {
        return new Credits(this._maximum, this._maximum, new Date());
    }
}
