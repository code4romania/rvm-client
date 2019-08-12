import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { VolunteerService } from '../../../volunteers.service';

@Component({
	selector: 'app-volunteer-dashboard',
	templateUrl: './volunteer-dashboard.component.html',
	styleUrls: ['./volunteer-dashboard.component.scss']
})
export class VolunteerDashboardComponent implements OnInit {
	volunteersData: any = [];
	count: String;
	pager: any = {};
	filterResult: any = {};
	displayBlock = true;
	multiselectconfig = {
		displayKey: 'name', // if objects array passed which key to be displayed defaults to description
		search: true, // true/false for the search functionlity defaults to false,
		height: '100', // height of the list so that if there are more no of items it can show a scroll defaults to auto
		limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
		// customComparator: ()=>{}
		moreText: 'altele', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
		noResultsFound: 'Niciun rezultat!', // text to be displayed when no items are found while searching
		searchPlaceholder: 'Cauta', // label thats displayed in search input,
		searchOnKey: 'name', // key on which search should be performed this will be selective search.
							// if undefined this will be extensive search on all keys
		};
	locationconfig = {...{placeholder: 'Locatie'}, ...this.multiselectconfig};
	typeconfig = {...{placeholder: 'Tip'}, ...this.multiselectconfig};
	ngoconfig = {...{placeholder: 'ONG'}, ...this.multiselectconfig};
	specializationconfig = {...{placeholder: 'Specializare'}, ...this.multiselectconfig};
	typeFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	NGOFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	LocationFilterValues: any[] = [{id: 'test', name: 'test'}, {id: 'test1', name: 'test1'}];
	specializationFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	constructor(private volunteerService: VolunteerService, public breakpointObserver: BreakpointObserver) { }
	ngOnInit() {
		this.pager = this.volunteerService.getPager();
		this.getData();
		/* subscribe to screen size in order to use list instead of grid for display */
		this.breakpointObserver.observe([
			'(max-width: 768px)'
		]).subscribe(result => {
			if (result.matches) {
				this.switchtolist();
			}
		});
	}
	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	onChange() {
		console.log(this.filterResult);
	}
	getData() {
		this.volunteerService.getVolunteers(this.pager).subscribe((element: any) => {
			if (element) {
				this.volunteersData = element.data;
				this.count = element.pager.total;
			}
		});
	}
	/**
	 * set class of display element with list view
	 */
	switchtolist() {
		this.displayBlock = false;
	}
	/**
	 * set class of display element with grid view
	 */
	switchtoblock() {
		this.displayBlock = true;
	}

}
