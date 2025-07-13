import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/presentation/auth.routes'),
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.page'),
        canActivate: [authGuard],
    },
    {
        path: 'chat-math',
        loadComponent: () => import('./features/chat-math/presentation/pages/chat-math/chat-math.page'),
        canActivate: [authGuard],
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
];
