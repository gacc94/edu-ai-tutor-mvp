import { Routes } from '@angular/router';
import { LoginPage } from './presentation/pages/login/login.page';

export const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginPage,
        data: { title: 'Login' },
        title: 'Login',
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];

export default authRoutes;
