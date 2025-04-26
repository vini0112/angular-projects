import { Routes } from "@angular/router";

export const femiRoutes: Routes = [
    {
        path: '',
        redirectTo: 'shortsfemi',
        pathMatch: "full"
    },
    {
        path: 'shortsfemi',
        loadComponent: () => import('./shortsfemi/shortsfemi.component').then(m => m.ShortsfemiComponent)
    },
    {
        path: 'shoesfemi',
        loadComponent: () => import('./shoes-femi/shoes-femi.component').then(m => m.ShoesFemiComponent)
    },
    {
        path: 'jackets',
        loadComponent: () => import('./jackets/jackets.component').then(m => m.JacketsComponent)
    }
    
]