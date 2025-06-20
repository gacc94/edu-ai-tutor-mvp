export class Credits {
    private readonly _value: number;

    private constructor(value: number, private readonly maxValue: number) {
        if (value < 0) {
            throw new Error('Credits cannot be negative');
        }
        
        if (value > maxValue) {
            throw new Error(`Credits cannot exceed max value of ${maxValue}`);
        }
        
        this._value = value;
    }

    static create(value: number, maxValue: number): Credits {
        return new Credits(value, maxValue);
    }

    get value(): number {
        return this._value;
    }

    add(amount: number): Credits {
        return new Credits(this._value + amount, this.maxValue);
    }

    subtract(amount: number): Credits {
        return new Credits(this._value - amount, this.maxValue);
    }

    hasEnough(amount: number): boolean {
        return this._value >= amount;
    }

    isZero(): boolean {
        return this._value === 0;
    }

    get percentage(): number {
        return Math.round((this._value / this.maxValue) * 100);
    }
}
