import { UserResponseDto } from '@core/auth/infrastructure/mappers/firebase.mapper';
import { AppResponseDto } from '@shared/infrastructure/dtos/app-response.dto';

export interface IUserAuthRepository {
    signIn(): Promise<AppResponseDto<UserResponseDto>>;
}
