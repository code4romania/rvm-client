import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationsComponent } from './organisations/organisations.component';
import { NgodashboardComponent } from './organisations/components/ngodashboard/ngodashboard.component';
import { NgoaddComponent } from './organisations/components/ngoadd/ngoadd.component';
import { NgodetailsComponent } from './organisations/components/ngodetails/ngodetails.component';
const routes: Routes = [
	{
		path: '',
		component: OrganisationsComponent,
		children: [
			{
				path: '',
				component: NgodashboardComponent,
			},
			{
				path: 'add',
				component: NgoaddComponent,
			},
			{
				path: 'id/:id',
				component: NgodetailsComponent,
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
