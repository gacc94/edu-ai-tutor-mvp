import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full',
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
        path: 'premium',
        loadComponent: () => import('./features/subscription/presentation/pages/premium/premium.page'),
        canActivate: [authGuard],
    },
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/presentation/auth.routes'),
    },
    {
        path: '**',
        redirectTo: '/home',
    },
];
