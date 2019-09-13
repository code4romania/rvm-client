import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDashboardComponent } from './users/components/user-dashboard/user-dashboard.component';
import { AddUserComponent } from './users/components/add-user/add-user.component';
import { UserDetailsComponent } from './users/components/user-details/user-details.component';
import { RoleGuard } from '@app/core/authentication/role.guard';
import { EditUserComponent } from './users/components/edit-user/edit-user.component';


const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		children: [
			{
				path: '',
				component: UserDashboardComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'INS']}
			},
			{
				path: 'add/:role',
				component: AddUserComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'INS']}
			},
			{
				path: 'edit/:id',
				component: EditUserComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO', 'INS']}
			},
			{
				path: 'id/:id',
				component: UserDetailsComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO', 'INS']}
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule { }
