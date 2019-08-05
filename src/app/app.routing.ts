import { Routes, RouterModule } from '@angular/router';

import { BlankComponent } from '@app/shared';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AuthenticationGuard, AnonymousGuard, RoleGuard } from './core';
import { NgModule } from '@angular/core';

const AppRoutes: Routes = [
	{
		path: '',
		component: TopBarComponent,
		canActivate: [AuthenticationGuard],
		children: [
			{
				path: '',
				loadChildren:
					'./pages/dashboard/dashboard.module#DashboardModule'
			}
		]
	},
	{
		path: '',
		component: BlankComponent,
		canActivate: [AnonymousGuard],
		children: [
			{
				path: '',
				loadChildren:
					'./pages/authentication/authentication.module#AuthenticationModule'
			}
		]
	},
	{ path: '**', redirectTo: '/404' }
];
@NgModule({
	imports: [RouterModule.forRoot(AppRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
