import { CreditProps } from '../interfaces/credit.props';
import { Timestamp } from 'firebase/firestore';

export interface UserProps {
    id: string;
    email: string;
    displayName: string;
    authProvider: string;
    credits: CreditProps;
    emailVerified: boolean;
    isActive: boolean;
    photoURL: string | null;
    phoneNumber: string | null;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    lastLoginAt: Timestamp;
}

export interface UserPropsFromProviders extends UserProps {}
