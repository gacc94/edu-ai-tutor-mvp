import { Injectable, Inject } from '@angular/core';
import { CREDITS_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { CreditsState } from '../states/interfaces/credits.state';
import { CreditsMapper } from '../mappers/credits.mapper';
import { CreditsFactory } from '@features/chat-math/domain/factories/credits.factory';

@Injectable({ providedIn: 'root' })
export class ConsumeCreditsUseCase {
    constructor(@Inject(CREDITS_STATE) private _creditsState: IStateStorage<CreditsState>) {}

    async execute(amount: number = 1): Promise<void> {
        const currentState = this._creditsState.$state();

        let credits = currentState ? CreditsMapper.toDomain(currentState) : CreditsFactory.createDefault();

        if (!credits.hasCredits || credits.current < amount) {
            throw new Error('Insufficient credits');
        }

        const updatedCredits = credits.consume(amount);
        const newState = CreditsMapper.toState(updatedCredits);

        await this._creditsState.save(newState);
    }
}
