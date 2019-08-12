import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ResourcesService } from '../../../resources.service';

import { FiltersService, CitiesCountiesService } from '../../../../../core/service';

@Component({
	selector: 'app-resourcesdashboard',
	templateUrl: './resourcesdashboard.component.html',
	styleUrls: ['./resourcesdashboard.component.scss']
})
export class ResourcesdashboardComponent implements OnInit {
	resourcesData: any[] = [];
	pager: any = {};
	pagerTotal = 0;
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
		selectAll: 'true', // Should enable select all feature for multiple select items
		selectAllText: 'Select All'
		};
	typeconfig = {...{placeholder: 'Tip'}, ...this.multiselectconfig};
	locationconfig = {...{placeholder: 'Locatie'}, ...this.multiselectconfig};
	ngoconfig = {...{placeholder: 'ONG'}, ...this.multiselectconfig};
	typefilterResult: any[] = [];
	locationfilterResult: any[] = [];
	ngofilterResult: any[];
	// Text configuration

	typeFilterValues: any[] = [];
	NGOFilterValues: any[] = [];
	locationFilterValues: any[] = [];

	constructor(private resourceService: ResourcesService, private filterService: FiltersService,
		private citiesandCounties: CitiesCountiesService) {

	}
	ngOnInit() {
		this.pager = this.resourceService.getPager();
		this.getData();
		this.filterService.getTypeFilters().subscribe((data) => {
			this.typeFilterValues = data.map((elem: any) => {
				return {id: elem.type_name, name: elem.type_name};
				});
		});
		this.filterService.getOrganizationsFilters().subscribe((data) => {
			this.NGOFilterValues = data.map((elem: any) => {
				return {id: elem.name, name: elem.name};
				});
			// this.ngofilterResult = data.map((elem:any) => elem.name);
		});
		this.locationFilterValues = this.citiesandCounties.getCounties().map((value: String) => {
			return {id: value, name: value};
		});
	}

	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}

	filterChanged = (data?: any, id?: string) => {
		console.log(data);
		this.pager.filters[id] =  data.value.map((elem: { name: any; }) => elem.name).join(',');
		this.getData();
	}

	getData() {
		this.resourceService.getResources(this.pager).subscribe((data) => {
			this.resourcesData = data.data;
			this.pagerTotal = data.pager.total;
		});
	}
}
