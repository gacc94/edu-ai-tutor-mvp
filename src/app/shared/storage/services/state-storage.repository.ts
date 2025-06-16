import { inject, Inject, Injectable, Optional, signal, Signal } from '@angular/core';
import { IStateStorage } from '../interfaces/state-storage.interface';
import { Storage } from '../interfaces/storage.interface';
import { STATE_REGISTER_TOKEN, STORAGE_TOKEN } from '../providers/storage.provider';
import { StateRegister } from '../services/state-register';

@Injectable()
export class StateStorageRepository<T> implements IStateStorage<T> {
    private readonly _state = signal<T | undefined>(undefined);
    private readonly _register: StateRegister = inject(STATE_REGISTER_TOKEN);

    constructor(
        @Inject(STORAGE_TOKEN) private readonly _storage?: Storage,
        @Optional() @Inject('STORAGE_KEY') private readonly _storageKey?: string
    ) {
        this._register.register(this);
        this._getStorage();
    }

    get $state(): Signal<T | undefined> {
        return this._state.asReadonly();
    }

    async save(value: T): Promise<void> {
        this._state.set(value);

        if (this._storageKey && this._storage) await this._storage.set(this._storageKey, JSON.stringify(value));
    }

    async clear(): Promise<void> {
        this._state.set(undefined);

        if (this._storageKey && this._storage) await this._storage.remove(this._storageKey);
    }

    protected async _getStorage(): Promise<void> {
        if (!this._storageKey || !this._storage) return;

        const value = await this._storage.get(this._storageKey);
        if (!value) {
            this.clear();
            return;
        }

        const obj: T = JSON.parse(value);
        this._state.set(obj);
    }
}
