
import { Routes } from "@angular/router";

export const DevToolsRoutes: Routes = [
    
    {
        path: 'productmanagement',
        loadComponent: () => import('./products-tool/products-tool.component')
    }
]
