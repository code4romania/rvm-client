import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	declarations: [DashboardComponent],
	imports: [
		FormsModule,
		CommonModule,
		NgbModule,
		DashboardRoutingModule
	],
})
export class DashboardModule {}
