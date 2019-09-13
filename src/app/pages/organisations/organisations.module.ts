import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationsDashboardComponent } from './organisations/components/organisations-dashboard/organisations-dashboard.component';
import { OrganisationaddComponent } from './organisations/components/organisation-add/organisation-add.component';
import { NgodetailsComponent } from './organisations/components/organisation-details/organisation-details.component';
import { OrganisationService } from './organisations.service';
import { OrganisationsRoutingModule } from './organisations.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { SelectDropDownModule } from 'custom-select-dropdown';
import { NgxMultiselectModule } from '@ngx-lib/multiselect';
import { OrganisationEditComponent } from './organisations/components/organisation-edit/organisation-edit.component';
@NgModule({
	declarations: [
		OrganisationsComponent,
		NgodetailsComponent,
		OrganisationaddComponent,
		OrganisationsDashboardComponent,
		OrganisationEditComponent,
	],
	imports: [
		NgxMultiselectModule,
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
