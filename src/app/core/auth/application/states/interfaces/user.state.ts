export interface UserState {
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
