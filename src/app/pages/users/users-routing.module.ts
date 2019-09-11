import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDashboardComponent } from './users/components/user-dashboard/user-dashboard.component';
import { AddUserComponent } from './users/components/add-user/add-user.component';
import { UserDetailsComponent } from './users/components/user-details/user-details.component';


const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		children: [
			{
				path: '',
				component: UserDashboardComponent
			},
			{
				path: 'add/:role',
				component: AddUserComponent
			},
			{
				path: 'edit/:id',
				component: AddUserComponent
			},
			{
				path: 'id/:id',
				component: UserDetailsComponent
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule { }
