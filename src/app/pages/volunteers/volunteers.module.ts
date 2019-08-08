import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { VolunteersRoutingModule } from './volunteers.routing';
import { AddVolunteerComponent } from './volunteers/components/add-volunteer/add-volunteer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImportVolunteersComponent } from './volunteers/components/import-volunteers/import-volunteers.component';
import { VolunteerDashboardComponent } from './volunteers/components/volunteer-dashboard/volunteer-dashboard.component';
import { VolunteerDetailsComponent } from './volunteers/components/volunteer-details/volunteer-details.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

@NgModule({
	declarations: [
		VolunteersComponent,
		VolunteerDashboardComponent,
		AddVolunteerComponent,
		VolunteerDetailsComponent,
		ImportVolunteersComponent
	],
	imports: [
		MultiselectDropdownModule,
		NgbModule,
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		VolunteersRoutingModule
	],
	entryComponents: [],
	providers: []
})
export class VolunteersModule {}
