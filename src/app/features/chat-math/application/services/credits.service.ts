import { Injectable, inject } from '@angular/core';
import { ConsumeCreditsUseCase } from '../uses-cases/consume-credits.use-case';
import { GetCreditsUseCase } from '../uses-cases/get-credits.use-case';
import { ResetCreditsUseCase } from '../uses-cases/reset-credits.use-case';
import { Credits } from '@features/chat-math/domain/entities/credits.entity';

@Injectable({ providedIn: 'root' })
export class CreditsService {
    private readonly _consumeCreditsUseCase = inject(ConsumeCreditsUseCase);
    private readonly _getCreditsUseCase = inject(GetCreditsUseCase);
    private readonly _resetCreditsUseCase = inject(ResetCreditsUseCase);

    async getCredits(): Promise<Credits> {
        return this._getCreditsUseCase.execute();
    }

    async consumeCredits(amount: number = 1): Promise<void> {
        return this._consumeCreditsUseCase.execute(amount);
    }

    async resetCredits(): Promise<void> {
        return this._resetCreditsUseCase.execute();
    }

    async hasEnoughCredits(amount: number = 1): Promise<boolean> {
        const credits = await this.getCredits();
        return credits.current >= amount;
    }
}
