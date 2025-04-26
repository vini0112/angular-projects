import { Routes } from "@angular/router";

export const mascRoutes: Routes = [
    {
        path: '',
        redirectTo: 'shorts',
        pathMatch: "full"
    },
    {
        path: 'shorts',
        loadComponent: () => import('../masculino/shorts-masc/shorts-masc.component').then(m => m.ShortsMascComponent)
    },
    {
        path: 'shirts',
        loadComponent: () => import('../masculino/shirts/shirts.component').then(m => m.ShirtsComponent)
    },
    {
        path: 'coats',
        loadComponent: () => import('../masculino/coats/coats.component').then(m => m.CoatsComponent)
    },
    {
        path: 'shoes',
        loadComponent: () => import('../masculino/shoes/shoes.component').then(m => m.ShoesComponent)
    }
    
]


