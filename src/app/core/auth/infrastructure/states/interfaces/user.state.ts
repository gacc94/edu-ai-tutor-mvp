import { Timestamp } from 'firebase/firestore';

export interface IUserState {
    id: string;
    email: string;
    displayName: string;
    authProvider: string;
    credits: {
        current: number;
        max: number;
    };
    emailVerified: boolean;
    isActive: boolean;
    photoURL: string | null;
    phoneNumber: string | null;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    lastLoginAt: Timestamp;
}
