import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/presentation/auth.routes'),
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.page'),
        canActivate: [AuthGuard],
    },
    {
        path: 'chat-math',
        loadComponent: () => import('./features/chat-math/presentation/pages/chat-math/chat-math.page'),
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
];
