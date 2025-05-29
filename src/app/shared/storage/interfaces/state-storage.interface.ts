import { Signal } from '@angular/core';

export interface StateStorage<T> {
    $state: Signal<T | undefined>;
    save(value: T): Promise<T | undefined>;
    clear(): Promise<void>;
}
