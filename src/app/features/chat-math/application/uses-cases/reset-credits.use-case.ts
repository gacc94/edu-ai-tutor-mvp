import { Injectable, Inject } from '@angular/core';
import { CREDITS_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { CreditsState } from '../states/interfaces/credits.state';
import { CreditsMapper } from '../mappers/credits.mapper';
import { CreditsFactory } from '@features/chat-math/domain/factories/credits.factory';

@Injectable({ providedIn: 'root' })
export class ResetCreditsUseCase {
    constructor(@Inject(CREDITS_STATE) private _creditsState: IStateStorage<CreditsState>) {}

    async execute(): Promise<void> {
        const resetCredits = CreditsFactory.createDefault();
        const newState = CreditsMapper.toState(resetCredits);
        await this._creditsState.save(newState);
    }
}
