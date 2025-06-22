import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/presentation/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
        canActivate: [AuthGuard],
    },
    {
        path: 'chat-math',
        loadComponent: () => import('./features/chat-math/presentation/pages/chat-math/chat-math.page'),
        canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/auth.routes').then((m) => m.authRoutes),
    },
    {
        path: '**',
        redirectTo: '/home',
    },
];
