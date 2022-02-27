import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { InfoRoutingModule } from './info.routing';
@NgModule({
    declarations: [
        InfoComponent
    ],
    imports: [
        CommonModule,
        InfoRoutingModule,
    ],
    providers: []
})
export class InfoModule {

}
