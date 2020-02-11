import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationaddComponent } from './organisations/components/organisation-add/organisation-add.component';
import { NgodetailsComponent } from './organisations/components/organisation-details/organisation-details.component';
import { RoleGuard } from '@app/core';
import { OrganisationEditComponent } from './organisations/components/organisation-edit/organisation-edit.component';
import { OrganisationsDashboardComponent } from './organisations/components/organisations-dashboard/organisations-dashboard.component';
const routes: Routes = [
	{
		path: '',
		component: OrganisationsComponent,
		children: [
			{
				path: '',
				component: OrganisationsDashboardComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU']}
			},
			{
				path: 'add',
				component: OrganisationaddComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU']}
			},
			{
				path: 'edit/:id',
				component: OrganisationEditComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
			{
				path: 'id/:id',
				component: NgodetailsComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']},
			},
			{
				path: 'id/:id/:tabname',
				component: NgodetailsComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']},
			},
			{
				path: 'id/:id/validate',
				component: NgodetailsComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']},
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
