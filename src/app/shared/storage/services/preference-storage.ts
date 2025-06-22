import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Storage } from '../interfaces/storage.interface';

@Injectable()
export class PreferencesStorage implements Storage {
    async set(key: string, value: string): Promise<void> {
        await Preferences.set({ key, value });
    }

    async get(key: string): Promise<string | null> {
        const { value } = await Preferences.get({ key });
        return value ?? null;
    }

    async remove(key: string): Promise<void> {
        await Preferences.remove({ key });
    }
}
