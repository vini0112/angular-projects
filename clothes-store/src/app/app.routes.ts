import { Routes } from '@angular/router';
import { HomeComponent } from './user_page/home/home.component';
import { FemininoComponent } from './user_page/feminino/feminino.component';
import { MasculinoComponent } from './user_page/masculino/masculino.component';
import { authGuard } from '../guards/auth.guard';
import { resetPasswordGuard } from '../guards/reset-password.guard';
import { blockLeavePasswordResetGuard } from '../guards/block-leave-password-reset.guard';
import { devLoginGuard } from '../guards/dev-login.guard';
import { loginActiveGuard } from '../guards/login-active.guard';
import { AllToolsComponent } from './all-tools/all-tools.component';



export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch:'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'masculino',
        component: MasculinoComponent,
        loadChildren: () => import('../app/user_page/masculino/masculino.routes').then(m => m.mascRoutes)
    },
    {
        path: 'feminino',
        component: FemininoComponent,
        loadChildren: () => import('../app/user_page/feminino/feminino.routes').then(m => m.femiRoutes)
    },
    {
        path: 'favorites',
        loadComponent: () => import('../app/user_page/favorites/favorites.component').then(m => m.FavoritesComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('../app/user_page/login/login.component').then(m => m.LoginComponent),
        canActivate: [authGuard]
    },
    {
        path: 'reset-password/:token',
        loadComponent: () => import('../app/user_page/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
        canActivate: [resetPasswordGuard],
        canDeactivate: [blockLeavePasswordResetGuard]
    },
    {
        path: 'developer_side',
        component: AllToolsComponent,
        loadChildren: () => import('./all-tools/devtools.routes').then(m => m.DevToolsRoutes),
        canActivate: [devLoginGuard]
    },
    {
        path: 'ship-address',
        loadComponent: () => import('./user_page/shipping-form/shipping-form.component').then(m => m.ShippingFormComponent),
        canActivate: [loginActiveGuard]
    },

    {
        path: 'checkout-payment',
        loadComponent: () => import('./user_page/checkout-payment/checkout-payment.component').then(m => m.CheckoutPaymentComponent),
        canActivate: [loginActiveGuard]
    },
    
    {
        path: 'payment-status',
        loadComponent: () => import('./user_page/payment-status/payment-status.component').then(m => m.PaymentStatusComponent),
    },
    
    { 
        path: '**', redirectTo: 'home'
    }
];
