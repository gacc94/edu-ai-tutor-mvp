import { Injectable, Inject } from '@angular/core';
import { CREDITS_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { CreditsState } from '../states/interfaces/credits.state';
import { CreditsMapper } from '../mappers/credits.mapper';
import { CreditsFactory } from '@features/chat-math/domain/factories/credits.factory';
import { Credits } from '@features/chat-math/domain/entities/credits.entity';

@Injectable({ providedIn: 'root' })
export class GetCreditsUseCase {
    constructor(@Inject(CREDITS_STATE) private _creditsState: IStateStorage<CreditsState>) {}

    async execute(): Promise<Credits> {
        const currentState = this._creditsState.$state();

        if (currentState) return CreditsMapper.toDomain(currentState);

        console.log('No credits found, initializing default credits');

        const defaultCredits = CreditsFactory.createDefault();
        const newState = CreditsMapper.toState(defaultCredits);
        await this._creditsState.save(newState);
        return defaultCredits;
    }
}
