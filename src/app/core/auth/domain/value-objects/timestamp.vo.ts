import { Timestamp } from 'firebase/firestore';

export class TimestampVo {
    private readonly _value: Timestamp;

    constructor(value: Timestamp) {
        // if (!value || !(value instanceof Timestamp)) {
        //     throw new Error('Invalid Timestamp instance');
        // }

        this._value = value;
    }

    toDate(): Date {
        return this._value.toDate();
    }

    toMillis(): number {
        return this._value.toMillis();
    }

    equals(other: TimestampVo): boolean {
        return this._value.isEqual(other._value);
    }

    toString(): string {
        return this._value.toString();
    }

    /**
     * @returns The value of the TimestampVo instance.
     */
    get value(): Timestamp {
        return this._value;
    }
}
