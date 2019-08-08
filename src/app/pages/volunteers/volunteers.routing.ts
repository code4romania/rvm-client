import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { AddVolunteerComponent } from './volunteers/components/add-volunteer/add-volunteer.component';
import { ImportVolunteersComponent } from './volunteers/components/import-volunteers/import-volunteers.component';
import { VolunteerDashboardComponent } from './volunteers/components/volunteer-dashboard/volunteer-dashboard.component';
import { VolunteerDetailsComponent } from './volunteers/components/volunteer-details/volunteer-details.component';
const routes: Routes = [
	{
		path: '',
		component: VolunteersComponent,
		children: [
			{
				path: '',
				component: VolunteerDashboardComponent
			},
			{
				path: 'add',
				component: AddVolunteerComponent
			},
			{
				path: 'id/:id',
				component: VolunteerDetailsComponent
			},
			{
				path: 'import',
				component: ImportVolunteersComponent
			}
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class VolunteersRoutingModule {}
