export interface UserState {
    uid: string;
    email: string;
    displayName: string | null | undefined;
    photoURL: string | null | undefined;
    credits: number;
    maxCredits: number;
    createdAt: string;
    updatedAt: string;
    isEmailVerified: boolean;
    provider: 'google' | 'email';
}
