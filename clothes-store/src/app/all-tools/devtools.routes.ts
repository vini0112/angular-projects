
import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const DevToolsRoutes: Routes = [
    
    {
        path: 'productmanagement',
        loadComponent: () => import('./products-tool/products-tool.component')
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DashboardRoutes)

    }
]
