import { UserState } from './user.state';

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: UserState | null;
    error: string | null;
}
