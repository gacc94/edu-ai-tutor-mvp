import { Injectable, inject } from '@angular/core';
import { SignInWithGoogleUseCase } from '../use-cases/sign-in-with-google.use-case';
import { SignOutUseCase } from '../use-cases/sign-out.use-case';
import { GetCurrentUserUseCase } from '../use-cases/get-current-user.use-case';
import { UpdateUserCreditsUseCase } from '../use-cases/update-user-credits.use-case';
import { User } from '@core/auth/domain/entities/user.entity';
import { SignInResult } from '@core/auth/domain/repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly _signInWithGoogleUseCase = inject(SignInWithGoogleUseCase);
    private readonly _signOutUseCase = inject(SignOutUseCase);
    private readonly _getCurrentUserUseCase = inject(GetCurrentUserUseCase);
    private readonly _updateUserCreditsUseCase = inject(UpdateUserCreditsUseCase);

    async signInWithGoogle(): Promise<SignInResult> {
        return this._signInWithGoogleUseCase.execute();
    }

    async signOut(): Promise<void> {
        return this._signOutUseCase.execute();
    }

    async getCurrentUser(): Promise<User | null> {
        return this._getCurrentUserUseCase.execute();
    }

    async updateUserCredits(currentCredits: number, maxCredits?: number): Promise<void> {
        return this._updateUserCreditsUseCase.execute(currentCredits, maxCredits);
    }

    async consumeUserCredits(amount: number = 1): Promise<void> {
        const user = await this.getCurrentUser();
        if (!user) {
            throw new Error('No user found');
        }

        const updatedUser = user.consumeCredits(amount);
        await this.updateUserCredits(updatedUser.credits.current, updatedUser.credits.maximum);
    }

    async addUserCredits(amount: number): Promise<void> {
        const user = await this.getCurrentUser();
        if (!user) {
            throw new Error('No user found');
        }

        const updatedUser = user.addCredits(amount);
        await this.updateUserCredits(updatedUser.credits.current, updatedUser.credits.maximum);
    }

    async resetUserCredits(): Promise<void> {
        const user = await this.getCurrentUser();
        if (!user) {
            throw new Error('No user found');
        }

        const updatedUser = user.resetCredits();
        await this.updateUserCredits(updatedUser.credits.current, updatedUser.credits.maximum);
    }
}
