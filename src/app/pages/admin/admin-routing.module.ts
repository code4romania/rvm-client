import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreateUserComponent } from './admin/components/create-user/create-user.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent
	},
	{
		path: 'create',
		component: CreateUserComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
