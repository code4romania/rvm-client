import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesRoutingModule } from './resources.routing';
import { ResourcesdashboardComponent } from './resources/components/resourcesdashboard/resourcesdashboard.component';
import { ResourcedetailsComponent } from './resources/components/resourcedetails/resourcedetails.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResourcesService } from './resources.service';
import { SharedModule } from '../../shared/shared.module';
// import { SelectDropDownModule} from 'ngx-select-dropdown';
import { SelectDropDownModule } from 'custom-select-dropdown';
@NgModule({
		declarations: [
			ResourcesComponent,
			ResourcesdashboardComponent,
			ResourcedetailsComponent,
		],
		imports: [
			SelectDropDownModule,
			NgbModule,
			CommonModule,
			FormsModule,
			ReactiveFormsModule,
			ResourcesRoutingModule,
			SharedModule,

		],
		entryComponents: [
		],
		providers: [
			ResourcesService,
		]
	})
export class ResourcesModule {

}
