export interface UserDto {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
    authProvider: string;
    currentCredits: number;
    maxCredits: number;
    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string;
    isEmailVerified: boolean;
    isActive: boolean;
}

export class UserFirestoreDto implements UserDto {
    constructor(
        public id: string,
        public email: string,
        public displayName: string,
        public authProvider: string,
        public currentCredits: number,
        public maxCredits: number,
        public createdAt: string,
        public updatedAt: string,
        public isEmailVerified: boolean,
        public isActive: boolean,
        public photoURL?: string,
        public lastLoginAt?: string
    ) {}

    static fromUser(user: any): UserFirestoreDto {
        return new UserFirestoreDto(
            user.id,
            user.email,
            user.displayName,
            user.authProvider,
            user.currentCredits,
            user.maxCredits,
            user.createdAt,
            user.updatedAt,
            user.isEmailVerified,
            user.isActive,
            user.photoURL,
            user.lastLoginAt
        );
    }

    toFirestore(): Record<string, any> {
        return {
            email: this.email,
            displayName: this.displayName,
            photoURL: this.photoURL || null,
            authProvider: this.authProvider,
            currentCredits: this.currentCredits,
            maxCredits: this.maxCredits,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            lastLoginAt: this.lastLoginAt || null,
            isEmailVerified: this.isEmailVerified,
            isActive: this.isActive,
        };
    }
}
