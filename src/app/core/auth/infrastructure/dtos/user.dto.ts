export interface UserDto {
    uid: string;
    email: string;
    displayName: string | null | undefined;
    photoURL: string | null | undefined;
    credits: number;
    maxCredits: number;
    createdAt: any; // Firestore Timestamp
    updatedAt: any; // Firestore Timestamp
    isEmailVerified: boolean;
    provider: 'google' | 'email';
}

export class CreateUserDto {
    constructor(
        public readonly uid: string,
        public readonly email: string,
        public readonly displayName: string | null | undefined,
        public readonly photoURL: string | null | undefined,
        public readonly credits: number,
        public readonly maxCredits: number,
        public readonly createdAt: any,
        public readonly updatedAt: any,
        public readonly isEmailVerified: boolean,
        public readonly provider: 'google' | 'email'
    ) {}
}
