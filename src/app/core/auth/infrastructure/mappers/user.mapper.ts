import { User } from '@core/auth/domain/entities/user.entity';
import { UserDto, UserFirestoreDto } from '../dtos/user.dto';
import { UserFactory } from '@core/auth/domain/factories/user.factory';

export class UserInfrastructureMapper {
    static toDto(user: User): UserDto {
        return {
            id: user.id.value,
            email: user.email.value,
            displayName: user.displayName.value,
            photoURL: user.photoURL.isEmpty ? undefined : user.photoURL.value,
            authProvider: user.authProvider.value,
            currentCredits: user.credits.current,
            maxCredits: user.credits.maximum,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            lastLoginAt: user.lastLoginAt?.toISOString(),
            isEmailVerified: user.isEmailVerified,
            isActive: user.isActive,
        };
    }

    static toDomain(dto: UserDto): User {
        return UserFactory.createFromData(dto);
    }

    static toFirestoreDto(user: User): UserFirestoreDto {
        const dto = this.toDto(user);
        return UserFirestoreDto.fromUser(dto);
    }

    static fromFirestoreData(id: string, data: any): User {
        return UserFactory.createFromData({
            id,
            email: data.email,
            displayName: data.displayName,
            photoURL: data.photoURL,
            authProvider: data.authProvider,
            currentCredits: data.currentCredits,
            maxCredits: data.maxCredits,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            lastLoginAt: data.lastLoginAt,
            isEmailVerified: data.isEmailVerified,
            isActive: data.isActive,
        });
    }
}
