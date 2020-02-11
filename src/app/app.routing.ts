import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard, RoleGuard } from './core';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './pages/404';

const AppRoutes: Routes = [
	{
		path: '',
		data: {dashboard: true},
		canActivate: [AuthenticationGuard],
		children: [
			{
				path: 'volunteers',
				loadChildren: './pages/volunteers/volunteers.module#VolunteersModule',
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO', 'INS']}
			},
			{
				path: 'resources',
				loadChildren: './pages/resources/resources.module#ResourcesModule',
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
			{
				path: 'organisations',
				loadChildren: './pages/organisations/organisations.module#OrganisationsModule',
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
			{
				path: 'map',
				loadChildren: './pages/map/map.module#MapModule',
				canActivate: [RoleGuard],
				data: {roles: ['DSU']}
			},
			{
				path: 'info',
				loadChildren: './pages/info/info.module#InfoModule',
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO', 'INS']}
			},
			{
				path: 'users',
				loadChildren: './pages/users/users.module#UsersModule',
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO', 'INS']}
			}
		]
	},
	{
		path: '',
		loadChildren: './pages/authentication/authentication.module#AuthenticationModule'
	},
	{
		path: '404',
		component: NotFoundComponent
	},
	{ path: '**', redirectTo: '/404' }
];
@NgModule({
	imports: [RouterModule.forRoot(AppRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
