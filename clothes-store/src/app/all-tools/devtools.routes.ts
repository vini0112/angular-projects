
import { Routes } from "@angular/router";

export const DevToolsRoutes: Routes = [
    
    {
        path: 'productmanagement',
        loadComponent: () => import('./products-tool/products-tool.component')
    },
    // {
    //     path: 'productCreation',
    //     loadComponent: () => import('./products-tool/creating-product/creating-product.component')
    // }
]
