import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';
import { Storage } from '../interfaces/storage.interface';

@Injectable()
export class PreferencesStorage implements Storage {
    set(key: string, value: string): Promise<void> {
        return Preferences.set({ key, value });
    }

    get(key: string): Promise<GetResult> {
        return Preferences.get({ key });
    }

    remove(key: string): Promise<void> {
        return Preferences.remove({ key });
    }
}
