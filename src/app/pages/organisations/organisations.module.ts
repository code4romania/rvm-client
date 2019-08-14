import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationsComponent } from './organisations/organisations.component';
import { NgodashboardComponent } from './organisations/components/ngodashboard/ngodashboard.component';
import { NgoaddComponent } from './organisations/components/ngoadd/ngoadd.component';
import { NgodetailsComponent } from './organisations/components/ngodetails/ngodetails.component';
import { OrganisationService } from './organisations.service';
import { OrganisationsRoutingModule } from './organisations.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { SelectDropDownModule } from 'custom-select-dropdown';
@NgModule({
	declarations: [
		OrganisationsComponent,
		NgodetailsComponent,
		NgoaddComponent,
		NgodashboardComponent,
	],
	imports: [
		SelectDropDownModule,
		SharedModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		OrganisationsRoutingModule,
	],
	entryComponents: [

	],
	providers: [
		OrganisationService
	]
})

export class OrganisationsModule {

}
