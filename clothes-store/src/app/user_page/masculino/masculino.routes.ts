import { Routes } from "@angular/router";

export const mascRoutes: Routes = [
    {
        path: '',
        redirectTo: 'shorts',
        pathMatch: "full"
    },
    {
        path: 'shorts',
        loadComponent: () => import('../masculino/shorts-masc/shorts-masc.component')
    },
    {
        path: 'shirts',
        loadComponent: () => import('../masculino/shirts/shirts.component')
    },
    {
        path: 'coats',
        loadComponent: () => import('../masculino/coats/coats.component')
    },
    {
        path: 'shoes',
        loadComponent: () => import('../masculino/shoes/shoes.component')
    }
]


