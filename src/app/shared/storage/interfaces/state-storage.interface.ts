import { Signal } from '@angular/core';

export interface IStateStorage<T> {
    $state: Signal<T | undefined>;
    save(value: T): Promise<void>;
    clear(): Promise<void>;
}
