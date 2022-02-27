import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MapRoutingModule } from './map.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapService } from './map.service';
@NgModule({
	declarations: [
		MapComponent
	],
	imports: [
		NgbModule,
		CommonModule,
		MapRoutingModule,
	],
	providers: [
		MapService,
	]
})
export class MapModule {

}
