import { InjectionToken } from '@angular/core';
import { PreferencesStorage } from '../preference-storage';
import { Storage } from '../interfaces/storage.interface';

export const STORAGE_TOKEN = new InjectionToken<Storage>('Storage', {
    providedIn: 'root',
    factory: () => new PreferencesStorage(),
});
