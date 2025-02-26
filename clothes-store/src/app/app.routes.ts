import { Routes } from '@angular/router';
import { HomeComponent } from './user_page/home/home.component';
import { FemininoComponent } from './user_page/feminino/feminino.component';
import { MasculinoComponent } from './user_page/masculino/masculino.component';
import { authGuard } from '../guards/auth.guard';
import { resetPasswordGuard } from '../guards/reset-password.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch:'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'masculino',
        component: MasculinoComponent,
        loadChildren: () => import('../app/user_page/masculino/masculino.routes').then(m => m.mascRoutes)
    },
    {
        path: 'feminino',
        component: FemininoComponent,
        loadChildren: () => import('../app/user_page/feminino/feminino.routes').then(m => m.femiRoutes)
    },
    {
        path: 'favorites',
        loadComponent: () => import('../app/user_page/favorites/favorites.component')
    },
    {
        path: 'login',
        loadComponent: () => import('../app/user_page/login/login.component'),
        canActivate: [authGuard]
    },
    {
        path: 'reset-password',
        loadComponent: () => import('../app/user_page/reset-password/reset-password.component'),
        canActivate: [resetPasswordGuard]
    },
    { 
        path: '**', redirectTo: 'home'
    }
];
