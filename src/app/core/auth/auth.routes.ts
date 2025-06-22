import { Routes } from '@angular/router';
import { LoginGuard } from './presentation/guards/login.guard';

export const authRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => import('./presentation/pages/login/login.page').then((m) => m.LoginPage),
        canActivate: [LoginGuard],
    },
];

export default authRoutes;
