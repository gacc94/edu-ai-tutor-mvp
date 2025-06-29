import { CreditProps } from '../interfaces/credit.props';
import { IdVO, PhotoUrlVO, EmailVO, DisplayNameVO } from '../value-objects';
import { Timestamp } from 'firebase/firestore';

export interface UserProps {
    id: IdVO;
    email: EmailVO;
    displayName: DisplayNameVO;
    authProvider: string;
    credits: CreditProps;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    isEmailVerified: boolean;
    isActive: boolean;
    photoURL: PhotoUrlVO;
    lastLoginAt: Timestamp;
}

export interface UserPropsFromProviders {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
    isEmailVerified: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    lastLoginAt: Timestamp;
}
