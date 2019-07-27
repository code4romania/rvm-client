import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResourcesComponent } from './resources/resources.component';
import { ResourcesdashboardComponent } from './resources/components/resourcesdashboard/resourcesdashboard.component';
import { ResourcedetailsComponent } from './resources/components/resourcedetails/resourcedetails.component';
const routes: Routes = [
	{
		path: '',
		component: ResourcesComponent ,
		children: [
			{
				path: '',
				component: ResourcesdashboardComponent,
			},
			{
				path: 'id/:id',
				component: ResourcedetailsComponent,
			},
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class ResourcesRoutingModule {

}
