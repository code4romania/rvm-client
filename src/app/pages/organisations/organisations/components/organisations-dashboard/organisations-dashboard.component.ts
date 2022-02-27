import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../../organisations.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FiltersService, CitiesCountiesService } from '@app/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
	selector: 'app-organisations-dashboard',
	templateUrl: './organisations-dashboard.component.html',
	styleUrls: ['./organisations-dashboard.component.scss']
})
export class OrganisationsDashboardComponent implements OnInit {
	ngosData: any = [];
	pager: any = {};
	/**
	* flag to indicate use of list or grid display
	*/
	displayBlock = true;
	/**
	* selected values in the filters. Array of array of {id, name} objects
	*/
	selected = Array(4);

	/**
	* values to be displayed in filter menus
	*/
	categoryFilterValues: any[];
	typeFilterValues = [{ id: 'Națională', name: 'Națională' }, { id: 'Locală', name: 'Locală' }];
	specializationFilterValues: any[];
	locationFilterValues: any[];
	/**
	* mapping of object keys to filter recognizable keys
	*/
	propertyMap = {
		'_id': 'id',
		'parent_id': 'parent_id'
	};
	constructor(
		private organisationService: OrganisationService,
		public breakpointObserver: BreakpointObserver,
		private filterService: FiltersService,
		private citiesandcounties: CitiesCountiesService,
		private router: Router
	) { }


	ngOnInit() {
		this.organisationService.setPager();
		/**
		* get and store filter values
		*/
		this.citiesandcounties.getCounties('').subscribe((response: any) => {
			const aux = response;
			aux.map((elem: { id: any; _id: any; }) => elem.id = elem._id);
			this.locationFilterValues = aux;
		});

		this.filterService.getSpecializationFilters().subscribe((data) => {
			this.specializationFilterValues = data.map((elem: any) => {
				return { id: elem._id, name: elem.name };
			});
		});
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
		this.pager = this.organisationService.getPager();

		this.getData();

		/**
		* subscribe to screen size in order to use list instead of grid for display
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
	* sort callback
	* @param {any} Pager pager is modified by external componet and passed as param
	*/
	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	/**
	* search callback
	* @param {any} Pager pager is modified by external componet and passed as param
	*/
	searchChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	/**
	* get ngo list with filters in pager
	*/
	getData() {
		this.organisationService.getorganisations(this.pager).subscribe(element => {
			this.ngosData = element.data.map((elem: any) => {
				elem.nr_vol = 0;
				elem.nr_res = 0;
				return elem;
			});
			this.pager.total = element.pager.total;
		});
	}
	/**
	* muliselect filter callback
	* @param {number} id the index in the pager filters and filters selected array
	*/
	filterChanged(id?: number) {
		this.pager.filters[id] = this.selected[id].map((elem: any) => elem.id).join(',');
		this.getData();
	}
	/**
* single select filter callback
* @param {number} id the index in the pager filters and filters selected array
*/
	singleFilterChanged(id?: number) {

		if (this.selected[id]) {
			this.pager.filters[id] = this.selected[id].id;
		} else {
			this.pager.filters[id] = null;
		}
		console.log(this.pager.filters[id]);
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
	/**
	* navigate to NGO details page with specific tab open
	* @param {string} id the id of the organization to be show
	* @param {string} property the tab that needs to be open on page load
	* @param {number} e suppresed default event
	*/
	showOrganisationDetails(id: string, property: string, e: any) {
		e.preventDefault();
		const navigationExtras: NavigationExtras = {
			state: {
				tabName: property
			}
		};
		this.router.navigateByUrl('/organisations/id/' + id, navigationExtras);
	}
}
