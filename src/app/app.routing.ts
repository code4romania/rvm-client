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
				loadChildren: () => import('./pages/volunteers/volunteers.module').then(m => m.VolunteersModule),
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO', 'INS']}
			},
			{
				path: 'resources',
				loadChildren: () => import('./pages/resources/resources.module').then(m => m.ResourcesModule),
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
			{
				path: 'organisations',
				loadChildren: () => import('./pages/organisations/organisations.module').then(m => m.OrganisationsModule),
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
			{
				path: 'map',
				loadChildren: () => import('./pages/map/map.module').then(m => m.MapModule),
				canActivate: [RoleGuard],
				data: {roles: ['DSU']}
			},
			{
				path: 'info',
				loadChildren: () => import('./pages/info/info.module').then(m => m.InfoModule),
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO', 'INS']}
			},
			{
				path: 'users',
				loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO', 'INS']}
			}
		]
	},
	{
		path: '',
		loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
	},
	{
		path: '404',
		component: NotFoundComponent
	},
	{ path: '**', redirectTo: '/404' }
];
@NgModule({
	imports: [RouterModule.forRoot(AppRoutes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
