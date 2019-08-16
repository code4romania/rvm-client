import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationsComponent } from './organisations/organisations.component';
import { NgodashboardComponent } from './organisations/components/ngodashboard/ngodashboard.component';
import { NgoaddComponent } from './organisations/components/ngoadd/ngoadd.component';
import { NgodetailsComponent } from './organisations/components/ngodetails/ngodetails.component';
import { RoleGuard } from '@app/core';
const routes: Routes = [
	{
		path: '',
		component: OrganisationsComponent,
		children: [
			{
				path: '',
				component: NgodashboardComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU']}
			},
			{
				path: 'add',
				component: NgoaddComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU']}
			},
			{
				path: 'id/:id',
				component: NgodetailsComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class OrganisationsRoutingModule {

}
