import { Signal } from '@angular/core';

export interface StateStorage<T> {
    $state: Signal<T | undefined>;
    save(value: T): Promise<void>;
    clear(): Promise<void>;
}
