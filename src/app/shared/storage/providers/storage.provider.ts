import { InjectionToken } from '@angular/core';
import { PreferencesStorage } from '../services/preference-storage';
import { Storage } from '../interfaces/storage.interface';
import { StateRegister } from '../services/state-register';

export const STORAGE_KEY = new InjectionToken<string>('STORAGE_KEY');

export const STORAGE_TOKEN = new InjectionToken<Storage>('Storage', {
    providedIn: 'root',
    factory: () => new PreferencesStorage(),
});

export const STATE_REGISTER_TOKEN = new InjectionToken<StateRegister>('StateRegister', {
    providedIn: 'root',
    factory: () => new StateRegister(),
});
