import { AuthenticationGuard } from '@app/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const DashboardRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
  },
  {
    path: 'volunteers',
    loadChildren: '../volunteers/volunteers.module#VolunteersModule',
  },
  {
    path: 'resources',
    loadChildren: '../resources/resources.module#ResourcesModule',
  },
  {
    path: 'organizations',
    loadChildren: '../organizations/organizations.module#OrganizationsModule',
  },
  {
    path: 'map',
    loadChildren: '../map/map.module#MapModule',
  },
  {
    path: 'info',
    loadChildren: '../info/info.module#InfoModule',
  },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(DashboardRoutes)]
})
export class DashboardRoutingModule {

}
