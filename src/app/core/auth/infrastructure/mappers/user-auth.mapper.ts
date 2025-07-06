import { UserMapper } from '../mappers/user.mapper';
import { UserResponseDto, UserResponseSchema } from '../schemas/user.schema';
import { UserAuthResult } from '@core/auth/domain/interfaces/user-auth-result';
import { User } from '@core/auth/domain/entities';

export class UserAuthMapper {
    static toDomain(dto: UserResponseDto): UserAuthResult<User> {
        const { success, isNewUser, user } = UserResponseSchema.parse(dto);
        const userDomain = UserMapper.toDomain(user);
        return {
            success: success ?? false,
            isNewUser,
            user: userDomain,
        };
    }
}
