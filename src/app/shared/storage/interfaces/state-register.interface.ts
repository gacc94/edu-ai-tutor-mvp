import { IStateStorage } from '../interfaces/state-storage.interface';

export interface IClearable extends Pick<IStateStorage<any>, 'clear'> {}

export interface IStateRegister {
    register(state: IClearable): void;
    clearAll(): Promise<void>;
}
