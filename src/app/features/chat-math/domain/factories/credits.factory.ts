import { Credits, CreditsProps } from '../entities/credits.entity';

export class CreditsFactory {
    private static readonly DEFAULT_MAXIMUM_CREDITS = 10;

    static createDefault(): Credits {
        return Credits.create({
            current: this.DEFAULT_MAXIMUM_CREDITS,
            maximum: this.DEFAULT_MAXIMUM_CREDITS,
            lastReset: new Date(),
        });
    }

    static create(props: CreditsProps): Credits {
        return Credits.create(props);
    }

    static createFromState(current: number, maximum: number, lastReset?: string): Credits {
        return Credits.create({
            current,
            maximum,
            lastReset: lastReset ? new Date(lastReset) : undefined,
        });
    }
}
