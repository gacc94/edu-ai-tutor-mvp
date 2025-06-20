import { User } from '@core/auth/domain/entities/user.entity';
import { UserDto, CreateUserDto } from '../dtos/user.dto';
import { Timestamp } from '@angular/fire/firestore';
import { UserId } from '@core/auth/domain/value-objects/UserId';
import { Email } from '@core/auth/domain/value-objects/Email';
import { DisplayName } from '@core/auth/domain/value-objects/DisplayName';
import { PhotoURL } from '@core/auth/domain/value-objects/PhotoURL';
import { Credits } from '@core/auth/domain/value-objects/Credits';
import { AuthProvider } from '@core/auth/domain/value-objects/AuthProvider';

export class UserInfrastructureMapper {
    /**
     * Converts a User domain entity to a CreateUserDto
     * @param user The User domain entity
     * @returns A CreateUserDto
     */
    static toDto(user: User): CreateUserDto {
        return new CreateUserDto(
            user.id.value,
            user.email.value,
            user.displayName?.value ?? null,
            user.photoURL?.value ?? null,
            user.credits.value,
            user.maxCredits,
            Timestamp.fromDate(user.createdAt),
            Timestamp.fromDate(user.updatedAt),
            user.isEmailVerified,
            user.provider.value as 'google' | 'email'
        );
    }

    /**
     * Converts a UserDto to a User domain entity
     * @param dto The UserDto
     * @returns A User domain entity
     */
    static toDomain(dto: UserDto): User {
        return User.createInstance({
            id: UserId.fromString(dto.uid),
            email: Email.create(dto.email),
            displayName: dto.displayName ? DisplayName.create(dto.displayName) : undefined,
            photoURL: dto.photoURL ? PhotoURL.create(dto.photoURL) : undefined,
            credits: Credits.create(dto.credits, dto.maxCredits),
            maxCredits: dto.maxCredits,
            provider: AuthProvider.create(dto.provider),
            isEmailVerified: dto.isEmailVerified,
            createdAt: dto.createdAt?.toDate() || new Date(),
            updatedAt: dto.updatedAt?.toDate() || new Date()
        });
    }
}
