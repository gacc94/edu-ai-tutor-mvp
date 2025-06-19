import { Credits } from '../entities/credits.entity';

export interface CreditsRepository {
    getCredits(): Promise<Credits>;
    updateCredits(credits: Credits): Promise<void>;
    resetCredits(): Promise<Credits>;
}
