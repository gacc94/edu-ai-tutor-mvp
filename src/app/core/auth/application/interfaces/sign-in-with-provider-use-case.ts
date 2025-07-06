import { Token } from '@core/auth/domain/entities/token.entity';
import { AuthProvider } from '@core/auth/domain/enums';

export interface ISignInWithProviderUseCase {
    execute(provider: AuthProvider): Promise<Token>;
}
