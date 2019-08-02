import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { VolunteerdashboardComponent } from './volunteers/components/volunteerdashboard/volunteerdashboard.component';
import { AddVolunteerComponent } from './volunteers/components/add-volunteer/add-volunteer.component';
import { VolunteerdetailsComponent } from './volunteers/components/volunteerdetails/volunteerdetails.component';
const routes: Routes = [
	{
		path: '',
		component: VolunteersComponent,
		children: [
			{
				path: '',
				component: VolunteerdashboardComponent,
			},
			{
				path: 'add',
				component: AddVolunteerComponent,
			},
			{
				path: 'id/:id',
				component: VolunteerdetailsComponent,
			},
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class VolunteersRoutingModule {

}
