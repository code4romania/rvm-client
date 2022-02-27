import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../../../resources.service';

import { FiltersService, CitiesCountiesService } from '../../../../../core/service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-resources-dashboard',
	templateUrl: './resources-dashboard.component.html',
	styleUrls: ['./resources-dashboard.component.scss']
})
export class ResourcesdashboardComponent implements OnInit {
	/**
	 * store the resources list
	 */
	resourcesData: any[] = [];
	/**
	 * pager for the resources table
	 */
	pager: any = {};
	/**
	 * flag for HTML to know how to display data
	 */
	displayBlock = false;
	/**
 *values to select from when filtering
 */
	categoryFilterValues: any[] = [];
	locationFilterValues: any[] = [];
	/**
	 * selected filters array
	 */
	selected = new Array(2);
	/**
	 * match the id with _id and display parent_id in order to indent the apropriate subcategories
	 */
	propertyMap = {
		'_id': 'id',
		'parent_id': 'parent_id'
	};
	/**
 * navigation extras will be sent to add resource if user is ngo.
 */
	navigationExtras: any;
	constructor(private resourceService: ResourcesService,
		private filterService: FiltersService,
		private citiesandCounties: CitiesCountiesService,
		public breakpointObserver: BreakpointObserver,
		public authService: AuthenticationService,
		private router: Router) { }

	ngOnInit() {
		this.resourceService.setPager();
		this.pager = this.resourceService.getPager();

		this.getData();
		/**
		 * get filterable values
		 */
		this.filterService.getCategoryFilters().subscribe((data) => {
			this.categoryFilterValues = data.map((x: any) => {
				const parent = data.find((y: any) => y._id === x.parent_id);
				return {
					id: x._id,
					name: x.name,
					parent_id: x.parent_id,
					pp: x.parent_id === '0' ? x.name : (parent ? parent.name : null),
					level: x.parent_id === '0' ? 0 : 1
				};
			});
		});

		this.citiesandCounties.getCounties('').subscribe((response: any) => {
			const aux = response;
			aux.map((elem: { id: any; _id: any; }) => elem.id = elem._id);
			this.locationFilterValues = aux;
		});
		/**
		 *observe screen chage and and switch to grid view if screen is too smal
		 */
		this.breakpointObserver
			.observe(['(max-width: 768px)'])
			.subscribe(result => {
				if (result.matches) {
					this.switchtoblock();
				}
			});
	}
	/**
	 * get data from server and store localy

	 */
	getData() {
		this.resourceService.getResources(this.pager).subscribe((data) => {
			this.resourcesData = data.data;
			this.pager.total = data.pager.total;
		});
	}
	/**
	 * send user to add resource. if is NGO the ngo id is static.
	 */
	addresource() {
		if (this.authService.is('NGO')) {
			const navigationExtras = {
				state: {
					ngo: {
						// TO-DO: extragere informatiilor din contu utilizatorului
						name: this.authService.user.organisation.name,
						ngoid: this.authService.user.organisation._id
					}
				}
			};
			this.router.navigateByUrl('/resources/add', navigationExtras);
		} else {
			this.router.navigate(['resources/add']);
		}
	}
	/**
	 * sort callback. Filters added to pager and then a request is made
	 * @param {any} pager the pager with the search filer added
	 */
	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	/**
	 * search callback. Filters added to pager and then a request is made
	 * @param {any} pager the pager with the search filer added
	 */
	searchChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	/**
	 * filter callback. Filters added to pager and then a request is made
	 * @param {number} id the index in the pager filters and filters Selected array
	 */
	filterChanged(id?: number) {
		console.log(this.selected);
		this.pager.filters[id] = this.selected[id].map((elem: any) => elem.id).join(',');
		this.getData();
	}
	/**
	 * view details about resource by slug if DSU and by id if NGO
	 * @param {any} res the resource to be viewed
	 */
	viewdetails(res: any) {
		if (this.authService.is('DSU')) {
			this.router.navigateByUrl(`/resources/name/${res.slug}`);
		} else {
			this.router.navigateByUrl(`/resources/id/${res.resources[0]._id}`);
		}
	}
	/**
	 * set flag for HTML to list view
	 */
	switchtolist() {
		this.displayBlock = false;
	}

	/**
	 * set flag for HTML to grid view
	 */
	switchtoblock() {
		this.displayBlock = true;
	}
}
