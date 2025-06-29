import { CreditProps } from '../interfaces/credit.props';

export class Credit {
    constructor(private readonly props: CreditProps) {}

    get current(): number {
        return this.props.current;
    }

    get max(): number {
        return this.props.max;
    }

    get percentage(): number {
        return Math.round((this.current / this.max) * 100);
    }
}
