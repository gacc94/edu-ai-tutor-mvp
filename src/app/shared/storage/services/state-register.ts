import { IClearable, IStateRegister } from '../interfaces/state-register.interface';

export class StateRegister implements IStateRegister {
    private _states = new Set<IClearable>();

    register(state: IClearable) {
        this._states.add(state);
    }

    async clearAll() {
        if (this._states.size === 0) return;

        const clearPromises = Array.from(this._states).map((state) => state.clear());
        await Promise.all(clearPromises);
    }

    async initAll() {
        const initPromises = Array.from(this._states).map((state) => state.getStorage());
        await Promise.all(initPromises);
    }
}
