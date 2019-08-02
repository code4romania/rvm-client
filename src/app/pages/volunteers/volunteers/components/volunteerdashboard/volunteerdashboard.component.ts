import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '@app/pages/volunteers/volunteers.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
	selector: 'app-volunteerdashboard',
	templateUrl: './volunteerdashboard.component.html',
	styleUrls: ['./volunteerdashboard.component.scss']
})
export class VolunteerdashboardComponent implements OnInit {

	data: any = [];
	count: String;
	pagination = {}
		// limit: 1,
		// page: 2,
		// order: 'ASC',
		// sort: 'name' };
	model = 'block';
	listoptions = 'd-flex col-md-6 col-sm-6 col-lg-4';
	constructor(private volunteerService: VolunteerService, public breakpointObserver: BreakpointObserver) { }
	/**
	 * subscribe to screen size in order to use list instead of grid for display
	 */
	ngOnInit() {
		this.volunteerService.getVolunteers(this.pagination).subscribe(element => {
			if (element) {
				this.data = element;
				this.count = `${element.length} total`;
			}
		});
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
	/**
	 * set class of display element with list view
	 */
	switchtolist() {
		this.listoptions = 'd-flex col-md-12 col-sm-12 col-lg-12';
	}
	/**
	 * set class of display element with grid view
	 */
	switchtoblock() {
		this.listoptions = 'd-flex col-md-6 col-sm-6 col-lg-4';
	}

}
