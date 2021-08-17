import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileComponent } from './pages/mobile/mobile.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';
import { UsersComponent } from './pages/users/users.component';
import { PageWrapperComponent } from './pages/page-wrapper/page-wrapper.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { CouponsComponent } from './pages/coupons/coupons.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/coupons', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: PageWrapperComponent,
    children: [
      {
        path: 'orders',
        canActivate: [AuthGuard],
        component: OrdersComponent,
      },
      {
        path: 'orders-history',
        canActivate: [AuthGuard],
        component: OrdersHistoryComponent,
      },
      {
        path: 'coupons',
        canActivate: [AuthGuard],
            component: CouponsComponent,
      },
    ],
  },
  
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
