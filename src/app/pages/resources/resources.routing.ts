import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResourcesComponent } from './resources/resources.component';
import { ResourcesdashboardComponent } from './resources/components/resources-dashboard/resources-dashboard.component';
import { ResourcedetailsComponent } from './resources/components/resource-details/resource-details.component';
import { AddResourceComponent } from './resources/components/add-resource/add-resource.component';
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
			{
				path: 'add',
				component: AddResourceComponent,
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
