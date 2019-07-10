import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { VolunteersRoutingModule } from './volunteers.routing';
@NgModule({
    declarations: [
        VolunteersComponent
    ],
    imports: [
      CommonModule,
      VolunteersRoutingModule,
    ],
    entryComponents: [
  
    ],
    providers: [
      //OrganizationService
    ]
  })
export class VolunteersModule {

}
