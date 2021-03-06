import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResourcesComponent } from './resources/resources.component';
import { ResourcesdashboardComponent } from './resources/components/resources-dashboard/resources-dashboard.component';
import { ResourcedetailsComponent } from './resources/components/resource-details/resource-details.component';
import { AddResourceComponent } from './resources/components/add-resource/add-resource.component';
import { RoleGuard } from '@app/core';
import { ImportResourcesComponent } from './resources/components/import-resources/import-resources.component';
import { ResourceListComponent } from './resources/components/resource-list/resource-list.component';
import { EditResourceComponent } from './resources/components/edit-resource/edit-resource.component';
const routes: Routes = [
	{
		path: '',
		component: ResourcesComponent,
		children: [
			{
				path: '',
				component: ResourcesdashboardComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
			{
				path: 'edit/:id',
				component: EditResourceComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
			{
				path: 'id/:id',
				component: ResourcedetailsComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
			{
				path: 'name/:id',
				component: ResourceListComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU']}
			},
			{
				path: 'add',
				component: AddResourceComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			},
			{
				path: 'import',
				component: ImportResourcesComponent,
				canActivate: [RoleGuard],
				data: {roles: ['DSU', 'NGO']}
			}
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class ResourcesRoutingModule {

}
