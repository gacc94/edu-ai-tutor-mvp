import { Signal } from '@angular/core';

export interface StorageRepository<T> {
    $state: Signal<T | undefined>;
    save(value: T): Promise<void>;
    clear(): Promise<void>;
}
