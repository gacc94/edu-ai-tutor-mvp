import { Credits } from '@features/chat-math/domain/entities/credits.entity';
import { CreditsState } from '../states/interfaces/credits.state';

export class CreditsMapper {
    /**
     *
     * @param credits
     * @returns
     */
    static toState(credits: Credits): CreditsState {
        return {
            current: credits.current,
            maximum: credits.maximum,
            lastReset: credits.lastReset?.toISOString(),
        };
    }

    /**
     *
     * @param state
     * @returns
     */
    static toDomain(state: CreditsState): Credits {
        return Credits.create({
            current: state.current,
            maximum: state.maximum,
            lastReset: state.lastReset ? new Date(state.lastReset) : undefined,
        });
    }
}
