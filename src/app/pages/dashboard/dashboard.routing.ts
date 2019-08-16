import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '@app/core';

const DashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
	},
	{
		path: 'volunteers',
		loadChildren: '../volunteers/volunteers.module#VolunteersModule',
		canActivate: [RoleGuard],
		data: {roles: ['DSU', 'NGO', 'INSTITUT']}
	},
	{
		path: 'resources',
		loadChildren: '../resources/resources.module#ResourcesModule',
		canActivate: [RoleGuard],
		data: {roles: ['DSU', 'NGO']}
	},
	{
		path: 'organisations',
		loadChildren: '../organisations/organisations.module#OrganisationsModule',
		canActivate: [RoleGuard],
		data: {roles: ['DSU', 'NGO']}
	},
	{
		path: 'map',
		loadChildren: '../map/map.module#MapModule',
		canActivate: [RoleGuard],
		data: {roles: ['DSU']}
	},
	{
		path: 'info',
		loadChildren: '../info/info.module#InfoModule',
		canActivate: [RoleGuard],
		data: {roles: ['DSU', 'NGO', 'INSTITUT']}
	},
	{
		path: 'users',
		loadChildren: '../users/users.module#UsersModule',
		canActivate: [RoleGuard],
		data: {roles: ['DSU', 'INSTITUT']}
	}
];
@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(DashboardRoutes)]
})
export class DashboardRoutingModule {}
