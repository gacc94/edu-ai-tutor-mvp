import { GetResult } from '@capacitor/preferences';

export interface Storage {
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<GetResult>;
    remove(key: string): Promise<void>;
}
