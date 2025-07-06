import { Credit } from '../entities/credit.entity';
import { CreditProps } from '../interfaces/credit.props';

export class CreditFactory {
    static create(props: CreditProps): Credit {
        return new Credit({
            current: props.current,
            max: props.max,
        });
    }
}
