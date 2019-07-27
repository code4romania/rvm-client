import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesRoutingModule } from './resources.routing';
import { ResourcesdashboardComponent } from './resources/components/resourcesdashboard/resourcesdashboard.component';
import { ResourcedetailsComponent } from './resources/components/resourcedetails/resourcedetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
		declarations: [
			ResourcesComponent,
			ResourcesdashboardComponent,
			ResourcedetailsComponent,
		],
		imports: [
			NgbModule,
			CommonModule,
			ReactiveFormsModule,
			ResourcesRoutingModule,
		],
		entryComponents: [
		],
		providers: [
			//OrganizationService
		]
	})
export class ResourcesModule {

}
