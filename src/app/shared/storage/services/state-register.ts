import { IClearable, IStateRegister } from '../interfaces/state-register.interface';

export class StateRegister implements IStateRegister {
    private readonly _states: Set<IClearable> = new Set<IClearable>();

    register(state: IClearable): void {
        this._states.add(state);
    }

    async clearAll(): Promise<void> {
        if (this._states.size === 0) return;

        const clearPromises = Array.from(this._states).map((state) => state.clear());
        await Promise.all(clearPromises);
    }
}
