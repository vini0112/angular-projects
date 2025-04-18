
import { Routes } from "@angular/router";

export const DevToolsRoutes: Routes = [
    
    {
        path: 'productmanagement',
        loadComponent: () => import('./products-tool/products-tool.component')
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component')
    }
]
