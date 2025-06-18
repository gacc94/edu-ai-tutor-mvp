export interface UserCredits {
    current: number;
    maximum: number;
    lastUpdated: Date;
}

export interface CreditTransaction {
    id: string;
    amount: number;
    type: 'consumed' | 'added' | 'refunded';
    description: string;
    timestamp: Date;
}

export interface CreditsState {
    credits: UserCredits;
    transactions: CreditTransaction[];
    isLoading: boolean;
}
