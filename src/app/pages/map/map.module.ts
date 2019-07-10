import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component'
import { MapRoutingModule } from './map.routing';
@NgModule({
    declarations: [
      MapComponent
    ],
    imports: [
      CommonModule,
      MapRoutingModule,
    ],
    entryComponents: [
  
    ],
    providers: [
      //OrganizationService
    ]
  })
export class MapModule {

}
