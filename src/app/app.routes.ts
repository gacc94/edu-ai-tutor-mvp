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
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
];
