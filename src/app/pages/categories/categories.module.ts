import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDashboardComponent } from './categories/components/categories-dashboard/categories-dashboard.component';
import { CategoryAddComponent } from './categories/components/category-add/category-add.component';
import { CategoryEditComponent } from './categories/components/category-edit/category-edit.component';
import { CategoryDetailsComponent } from './categories/components/category-details/category-details.component';
import { CategoriesRoutingModule } from '@app/pages/categories/categories.routing';
import { NgxMultiselectModule } from '@ngx-lib/multiselect';
import { SelectDropDownModule } from 'custom-select-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';

@NgModule({
	declarations: [
		CategoriesComponent,
		CategoryAddComponent,
		CategoryEditComponent,
		CategoryDetailsComponent,
		CategoriesDashboardComponent
	],
	imports: [
		NgxMultiselectModule,
		SelectDropDownModule,
		NgbModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		CategoriesRoutingModule
	]
})
export class CategoriesModule {}
