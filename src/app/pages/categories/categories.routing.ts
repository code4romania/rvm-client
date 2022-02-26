import { NgModule } from '@angular/core';
import { RoleGuard } from '@app/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDashboardComponent } from './categories/components/categories-dashboard/categories-dashboard.component';
import { CategoryAddComponent } from './categories/components/category-add/category-add.component';
import { CategoryEditComponent } from './categories/components/category-edit/category-edit.component';
import { CategoryDetailsComponent } from './categories/components/category-details/category-details.component';

const routes: Routes = [
	{
		path: '',
		component: CategoriesComponent,
		children: [
			{
				path: '',
				component: CategoriesDashboardComponent,
				canActivate: [RoleGuard],
				data: { roles: ['DSU'] }
			},
			{
				path: 'add',
				component: CategoryAddComponent,
				canActivate: [RoleGuard],
				data: { roles: ['DSU'] }
			},
			{
				path: 'edit/:id',
				component: CategoryEditComponent,
				canActivate: [RoleGuard],
				data: { roles: ['DSU'] }
			},
			{
				path: 'id/:id',
				component: CategoryDetailsComponent,
				canActivate: [RoleGuard],
				data: { roles: ['DSU'] }
			}
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class CategoriesRoutingModule {}
