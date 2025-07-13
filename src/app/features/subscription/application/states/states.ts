import { InjectionToken } from '@angular/core';
import { SubscriptionState } from './interfaces/subscription.state';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { StateStorageRepository } from '@shared/storage/services/state-storage.repository';

export const SUBSCRIPTION_STATE = new InjectionToken<IStateStorage<SubscriptionState>>('SUBSCRIPTION_STATE', {
    providedIn: 'root',
    factory: () => new StateStorageRepository<SubscriptionState>('subscription_state'),
});
