import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { CreateUserComponent } from './admin/components/create-user/create-user.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [AdminComponent, CreateUserComponent],
	imports: [
		CommonModule,
		AdminRoutingModule,
		NgbModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class AdminModule {}
