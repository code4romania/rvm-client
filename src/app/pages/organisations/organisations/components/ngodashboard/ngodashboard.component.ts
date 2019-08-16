import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../../organisations.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FiltersService, CitiesCountiesService } from '@app/core';
@Component({
	selector: 'app-ngodashboard',
	templateUrl: './ngodashboard.component.html',
	styleUrls: ['./ngodashboard.component.scss']
})
export class NgodashboardComponent implements OnInit {
	ngosData: any = [];
	pager: any = {};
	pagerTotal = 0;
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
		locationconfig = {...{placeholder: 'Locație'}, ...this.multiselectconfig};
		typeconfig = {...{placeholder: 'Tip'}, ...this.multiselectconfig};
		specializationconfig = {...{placeholder: 'Specializare'}, ...this.multiselectconfig};

	typeFilterValues: any[];
	specializationFilterValues: any[];
	locationFilterValues: any[];
	constructor(
		private organisationService: OrganisationService,
		public breakpointObserver: BreakpointObserver,
		private filterService: FiltersService,
		private citiesandcounties: CitiesCountiesService
	) {}
	/**
	 * subscribe to screen size in order to use list instead of grid for display
	 */

	ngOnInit() {
		this.locationFilterValues = this.citiesandcounties.getCounties().map((value: String) => {
			return {id: value, name: value};
		});
		this.filterService.getTypeFilters().subscribe((data) => {
			this.typeFilterValues = data.map((elem: any) => {
				return {id: elem.type_name, name: elem.type_name};
				});
		});
		this.filterService.getSpecializationFilters().subscribe((data) => {
			this.specializationFilterValues = data.map((elem: any) => {
				return {id: elem.name, name: elem.name};
			});
		});
		this.pager = this.organisationService.getPager();

		this.getData();

		this.breakpointObserver
			.observe(['(max-width: 768px)'])
			.subscribe(result => {
				if (result.matches) {
					this.switchtoblock();
				}
			});
	}

	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}

	getData() {
		this.organisationService.getorganisations(this.pager).subscribe(element => {
			this.ngosData = element.data;
			this.pagerTotal = element.pager.total;
		});
	}

	filterChanged = (data?: any, id?: string) => {
		this.pager.filters[1] =  data.value.map((elem: { name: any; }) => elem.name).join(',');
		this.getData();
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
