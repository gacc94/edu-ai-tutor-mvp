import { Injectable, inject } from '@angular/core';
import { ConsumeCreditsUseCase } from '../uses-cases/consume-credits.use-case';
import { GetCreditsUseCase } from '../uses-cases/get-credits.use-case';
import { ResetCreditsUseCase } from '../uses-cases/reset-credits.use-case';
import { Credits } from '@features/chat-math/domain/entities/credits.entity';
import { AuthService } from '@core/auth/application/services/auth.service';

@Injectable({ providedIn: 'root' })
export class CreditsService {
    private readonly _consumeCreditsUseCase = inject(ConsumeCreditsUseCase);
    private readonly _getCreditsUseCase = inject(GetCreditsUseCase);
    private readonly _resetCreditsUseCase = inject(ResetCreditsUseCase);
    private readonly _authService = inject(AuthService);

    async getCredits(): Promise<Credits> {
        // Try to get credits from authenticated user first
        const user = this._authService.getCurrentUser();
        if (user) {
            return Credits.create({
                current: user.credits,
                maximum: user.maxCredits,
                lastReset: user.updatedAt,
            });
        }

        // Fallback to local storage
        return this._getCreditsUseCase.execute();
    }

    async consumeCredits(amount: number = 1): Promise<void> {
        const user = this._authService.getCurrentUser();
        if (user) {
            // Update user credits in Firestore and local state
            const newCredits = Math.max(0, user.credits - amount);
            await this._authService.updateUserCredits(newCredits);
        } else {
            // Fallback to local storage
            await this._consumeCreditsUseCase.execute(amount);
        }
    }

    async resetCredits(): Promise<void> {
        const user = this._authService.getCurrentUser();
        if (user) {
            // Reset user credits in Firestore and local state
            await this._authService.updateUserCredits(user.maxCredits);
        } else {
            // Fallback to local storage
            await this._resetCreditsUseCase.execute();
        }
    }

    async hasEnoughCredits(amount: number = 1): Promise<boolean> {
        const credits = await this.getCredits();
        return credits.current >= amount;
    }
}
