import { UserState } from './user.state';

export interface AuthState {
    isAuthenticated: boolean;
    user?: UserState;
    token?: string;
    isLoading: boolean;
}
