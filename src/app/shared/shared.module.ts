import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '@app/shared/breadcrumb/breadcrumb.component';
import { BlankComponent } from '@app/shared/layouts/blank/blank.component';
import { FullComponent } from '@app/shared/layouts/full/full.component';
import { SpinnerComponent } from '@app/shared/spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonLoaderComponent } from '@app/shared/button-loader';
import { TableSortDirective } from './table-sort/table-sort.directive';

const list = [
	SpinnerComponent,
	BreadcrumbComponent,
	BlankComponent,
	FullComponent,
	ButtonLoaderComponent,
	TableSortDirective,
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		NgbModule,
		ReactiveFormsModule
	],
	declarations: [...list],
	exports: [...list],
	entryComponents: [],
	providers: []
})
export class SharedModule {}
