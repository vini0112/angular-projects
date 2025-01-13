import { Routes } from "@angular/router";

export const femiRoutes: Routes = [
    {
        path: '',
        redirectTo: 'shortsfemi',
        pathMatch: "full"
    },
    {
        path: 'shortsfemi',
        loadComponent: () => import('./shortsfemi/shortsfemi.component')
    },
    {
        path: 'shoesfemi',
        loadComponent: () => import('./shoes-femi/shoes-femi.component')
    },
    {
        path: 'jackets',
        loadComponent: () => import('./jackets/jackets.component')
    }
    
]