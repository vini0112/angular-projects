
import { Routes } from "@angular/router";

export const DashboardRoutes: Routes = [
    {
        path: '',
        redirectTo: 'sales',
        pathMatch: 'full'
    },
    {
        path: "sales",
        loadComponent: () => import('./sales/sales.component')
    }

]
