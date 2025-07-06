import { CreditProps } from '../interfaces/credit.props';

export class Credit {
    private readonly _current: number;
    private readonly _max: number;

    constructor(props: CreditProps) {
        this._current = props.current;
        this._max = props.max;
    }

    get current(): number {
        return this._current;
    }

    get max(): number {
        return this._max;
    }

    get percentage(): number {
        return Math.round((this.current / this.max) * 100);
    }
}
