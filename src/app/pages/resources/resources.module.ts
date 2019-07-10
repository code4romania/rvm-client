import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesRoutingModule } from './resources.routing';
@NgModule({
    declarations: [
      ResourcesComponent
    ],
    imports: [
      CommonModule,
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
