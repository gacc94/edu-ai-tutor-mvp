import { Injectable, inject } from '@angular/core';
import { SignInWithGoogleUseCase } from '../use-cases/sign-in-with-google.use-case';
import { SignOutUseCase } from '../use-cases/sign-out.use-case';
import { GetCurrentUserUseCase } from '../use-cases/get-current-user.use-case';
import { UpdateUserCreditsUseCase } from '../use-cases/update-user-credits.use-case';
import { User } from '@core/auth/domain/entities/user.entity';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly _signInWithGoogleUseCase = inject(SignInWithGoogleUseCase);
    private readonly _signOutUseCase = inject(SignOutUseCase);
    private readonly _getCurrentUserUseCase = inject(GetCurrentUserUseCase);
    private readonly _updateUserCreditsUseCase = inject(UpdateUserCreditsUseCase);

    async signInWithGoogle(): Promise<void> {
        return this._signInWithGoogleUseCase.execute();
    }

    async signOut(): Promise<void> {
        return this._signOutUseCase.execute();
    }

    getCurrentUser(): User | null {
        return this._getCurrentUserUseCase.execute();
    }

    async updateUserCredits(newCredits: number): Promise<void> {
        return this._updateUserCreditsUseCase.execute(newCredits);
    }

    isAuthenticated(): boolean {
        return this.getCurrentUser() !== null;
    }
}
