import { Injectable, inject, signal } from '@angular/core';
import { SUBSCRIPTION_STATE } from '../states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { SubscriptionState } from '../states/interfaces/subscription.state';
import { SubscriptionPlanFactory } from '@features/subscription/domain/factories/subscription-plan.factory';
import { SubscriptionPlan } from '@features/subscription/domain/entities/subscription-plan.entity';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
    private readonly _subscriptionState = inject(SUBSCRIPTION_STATE);

    private readonly _plans = signal<SubscriptionPlan[]>(SubscriptionPlanFactory.getAllPlans());
    private readonly _selectedPlan = signal<SubscriptionPlan | null>(null);
    private readonly _isTrialEnabled = signal<boolean>(true);
    private readonly _isLoading = signal<boolean>(false);

    // Public getters
    get plans() {
        return this._plans.asReadonly();
    }

    get selectedPlan() {
        return this._selectedPlan.asReadonly();
    }

    get isTrialEnabled() {
        return this._isTrialEnabled.asReadonly();
    }

    get isLoading() {
        return this._isLoading.asReadonly();
    }

    async selectPlan(planId: string): Promise<void> {
        const plan = this._plans().find((p) => p.id === planId);
        if (plan) {
            this._selectedPlan.set(plan);
            await this._updateState({ selectedPlanId: planId });
        }
    }

    async toggleTrial(): Promise<void> {
        const newTrialState = !this._isTrialEnabled();
        this._isTrialEnabled.set(newTrialState);
        await this._updateState({ isTrialEnabled: newTrialState });
    }

    async startFreeTrial(): Promise<void> {
        this._isLoading.set(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Here you would integrate with your payment provider
            console.log('Starting free trial...');

            this._isLoading.set(false);
        } catch (error) {
            this._isLoading.set(false);
            throw error;
        }
    }

    async subscribeToPlan(planId: string): Promise<void> {
        this._isLoading.set(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Here you would integrate with your payment provider
            console.log(`Subscribing to plan: ${planId}`);

            this._isLoading.set(false);
        } catch (error) {
            this._isLoading.set(false);
            throw error;
        }
    }

    private async _updateState(updates: Partial<SubscriptionState>): Promise<void> {
        const currentState = this._subscriptionState.$state() || {
            selectedPlanId: null,
            isTrialEnabled: true,
            isLoading: false,
            error: null,
        };

        await this._subscriptionState.save({ ...currentState, ...updates });
    }
}
