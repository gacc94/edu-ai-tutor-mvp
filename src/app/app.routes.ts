import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/auth.routes'),
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.page'),
    },
    {
        path: 'chat-resolve-math',
        loadComponent: () =>
            import('./features/chat-math-solve/presentation/pages/chat-math-solve/chat-resolve-math.page'),
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
];
