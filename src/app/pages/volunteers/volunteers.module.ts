import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { VolunteersRoutingModule } from './volunteers.routing';
import { VolunteerdashboardComponent } from './volunteers/components/volunteerdashboard/volunteerdashboard.component';
import { AddVolunteerComponent } from './volunteers/components/add-volunteer/add-volunteer.component';
import { VolunteerdetailsComponent } from './volunteers/components/volunteerdetails/volunteerdetails.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
		declarations: [
				VolunteersComponent,
				VolunteerdashboardComponent,
				AddVolunteerComponent,
				VolunteerdetailsComponent
		],
		imports: [
			NgbModule,
			ReactiveFormsModule,
			FormsModule,
			CommonModule,
			VolunteersRoutingModule,
		],
		entryComponents: [
		],
		providers: [
		]
	})
export class VolunteersModule {

}
