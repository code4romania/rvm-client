import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ResourcesService } from '../../../resources.service';

import { FiltersService, CitiesCountiesService } from '../../../../../core/service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
	selector: 'app-resources-dashboard',
	templateUrl: './resources-dashboard.component.html',
	styleUrls: ['./resources-dashboard.component.scss']
})
export class ResourcesdashboardComponent implements OnInit {
	resourcesData: any[] = [];
	pager: any = {};
	pagerTotal = 0;
	displayBlock = false;
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
	isNGO = false;
	isDSU = false;
	navigationExtras: any;
	constructor(private resourceService: ResourcesService, private filterService: FiltersService,
		private citiesandCounties: CitiesCountiesService,  public breakpointObserver: BreakpointObserver,
		private authService: AuthenticationService, private router: Router) {

	}
	ngOnInit() {
		switch (this.authService.role) {
			case '2':
				this.isNGO = true;
				break;
			case '3':
				this.isDSU = true;
				break;
			default:
				break;
		}
		this.pager = this.resourceService.getPager();
		if (this.isNGO) {
			// TO-DO cu filtre DE LA backend
			this.pager.filters[3] = '4a7d54364a7156b6c12e5492cb0016f1';
		}
		this.getData();
		this.filterService.getTypeFilters().subscribe((data) => {
			this.typeFilterValues = data.map((elem: any) => {
				return {id: elem.type_name, name: elem.type_name};
				});
		});
		this.filterService.getOrganisationsFilters().subscribe((data) => {
			this.NGOFilterValues = data.map((elem: any) => {
				return {id: elem.name, name: elem.name};
				});
			// this.ngofilterResult = data.map((elem:any) => elem.name);
		});
		this.locationFilterValues = this.citiesandCounties.getCounties().map((value: String) => {
			return {id: value, name: value};
		});
		this.breakpointObserver
			.observe(['(max-width: 768px)'])
			.subscribe(result => {
				if (result.matches) {
					this.switchtoblock();
				}
			});
	}

	getData() {
		this.resourceService.getResources(this.pager).subscribe((data) => {
			this.resourcesData = data.data;
			this.pagerTotal = data.pager.total;
		});
	}

	addresource() {
		if (this.isNGO) {
			const navigationExtras = {
				state: {
					ngo: {
						// TO-DO: extragere informatiilor din contu utilizatorului
						name: 'Curcea Rosie',
						ngoid: '4a7d54364a7156b6c12e5492cb0016f1'
					}
				}
			};
			this.router.navigateByUrl('/resources/add', navigationExtras);
		} else {
			this.router.navigate(['resources/add']);
		}
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
