export interface SubscriptionState {
    selectedPlanId: string | null;
    isTrialEnabled: boolean;
    isLoading: boolean;
    error: string | null;
}
