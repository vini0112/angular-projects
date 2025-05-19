
import { Routes } from "@angular/router";

export const DashboardRoutes: Routes = [
    {
        path: '',
        redirectTo: 'sales',
        pathMatch: 'full'
    },
    {
        path: "sales",
        loadComponent: () => import('./sales/sales.component').then(m => m.SalesComponent)
    },
    {
        path: "clients",
        loadComponent: () => import("./clients/clients.component").then(m => m.ClientsComponent)
    }

]
