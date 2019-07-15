import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations/organizations.component';
import { NgodashboardComponent } from './organizations/components/ngodashboard/ngodashboard.component';
import { NgoaddComponent } from './organizations/components/ngoadd/ngoadd.component';
import { NgodetailsComponent } from './organizations/components/ngodetails/ngodetails.component';
import { OrganizationService } from './organizations.service';
import { OrganizationsRoutingModule } from './organizations.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		OrganizationsComponent,
		NgodetailsComponent,
		NgoaddComponent,
		NgodashboardComponent,
	],
	imports: [
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		OrganizationsRoutingModule,
	],
	entryComponents: [

	],
	providers: [
		OrganizationService
	]
})

export class OrganizationsModule {

}
