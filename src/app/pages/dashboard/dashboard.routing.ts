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
    loadChildren: '../edit-flow/edit-flow.module#EditFlowModule',
  },
  {
    path: 'resources',
    loadChildren: '../edit-flow/edit-flow.module#EditFlowModule',
  },
  {
    path: 'organizations',
    loadChildren: '../edit-flow/edit-flow.module#EditFlowModule',
},
{
  path: 'map',
  loadChildren: '../edit-flow/edit-flow.module#EditFlowModule',
},
{
  path: 'info',
  loadChildren: '../edit-flow/edit-flow.module#EditFlowModule',
},
];

<a [routerLink]="['/volunteers']" class="nav__link">Voluntari</a>
        </li>
        <li>
            <a [routerLink]="['/resources']" class="nav__link">Resurse</a>
        </li>
        <li>
            <a [routerLink]="['/organizations']" class="nav__link">Organizatii</a>
        </li>
        <li>
            <a [routerLink]="['/map']" class="nav__link">Harta</a>
        </li>
        <li>
            <a [routerLink]="['/info']" class="nav__link">Info</a>
        </li>

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(DashboardRoutes)]
})
export class DashboardRoutingModule {

}
