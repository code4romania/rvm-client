import { Routes, RouterModule } from '@angular/router';

import { BlankComponent, FullComponent } from '@app/shared';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AuthenticationGuard } from './core';
import { LoginComponent } from './pages/authentication';
import { NgModule } from '@angular/core';

const AppRoutes: Routes = [
  {
    path: '',
    component: TopBarComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {path: '**', redirectTo: '/404'}
];
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
