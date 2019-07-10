import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteersComponent } from './volunteers/volunteers.component';
const routes: Routes = [
    {
        path: '',
        component: VolunteersComponent,
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class VolunteersRoutingModule {

}
