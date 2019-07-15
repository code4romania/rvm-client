import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '@app/pages/organizations/organizations.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
@Component({
	selector: 'app-ngodashboard',
	templateUrl: './ngodashboard.component.html',
	styleUrls: ['./ngodashboard.component.scss']
})
export class NgodashboardComponent implements OnInit {
	data: any[] = [];
	model = 'block';
	listoptions = 'd-flex col-md-6 col-sm-6 col-lg-4';
	constructor(private organizationService: OrganizationService, public breakpointObserver: BreakpointObserver) { }
	ngOnInit() {
		this.data = this.organizationService.getData();
		this.breakpointObserver.observe([
			'(max-width: 768px)'
				]).subscribe(result => {
				if (result.matches) {
					this.model = 'list';
					this.switchtolist();
				}
				// } else {
				//   // if necessary:
				//   doSomethingElse();
				// }
			});
	}
	switchtolist() {
		this.listoptions = 'd-flex col-md-12 col-sm-12 col-lg-12';
	}
	switchtoblock() {
		this.listoptions = 'd-flex col-md-6 col-sm-6 col-lg-4';
	}

}
