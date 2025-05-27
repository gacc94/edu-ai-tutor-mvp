import { Provider } from '@angular/core';
import { PreferencesStorage } from '../preference-storage';

export const STORAGE_PROVIDERS: Provider[] = [
    {
        provide: PreferencesStorage,
        useFactory: () => new PreferencesStorage(),
    },
];
