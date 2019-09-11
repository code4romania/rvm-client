import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../../organisations.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FiltersService, CitiesCountiesService } from '@app/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
	selector: 'app-ngodashboard',
	templateUrl: './ngodashboard.component.html',
	styleUrls: ['./ngodashboard.component.scss']
})
export class NgodashboardComponent implements OnInit {
	ngosData: any = [];
	pager: any = {};
	displayBlock = true;
	selected = Array(4);
	categoryFilterValues: any[];
	typeFilterValues = [{id: 'Națională', name: 'Națională'}, {id: 'Locală', name: 'Locală'}];
	specializationFilterValues: any[];
	locationFilterValues: any[];
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
	) {}

	/**
	 * subscribe to screen size in order to use list instead of grid for display
	 */

	ngOnInit() {
		this.citiesandcounties.getCounties('').subscribe((response: any) => {
			const aux = response;
			aux.map((elem: { id: any; _id: any; }) => elem.id = elem._id);
			this.locationFilterValues = aux;
		});

		this.filterService.getSpecializationFilters().subscribe((data) => {
			this.specializationFilterValues = data.map((elem: any) => {
				return {id: elem._id, name: elem.name};
			});
		});
		this.filterService.getCategoryFilters().subscribe((data) => {
			this.categoryFilterValues = data.map((x: any) => {
				const parent = data.find((y: any) => y._id === x.parent_id);
				return {
					id: x._id,
					name: x.name,
					parent_id: x.parent_id,
					pp: x.parent_id === '0' ? x.name : ( parent ? parent.name : null),
					level: x.parent_id === '0' ? 0 : 1
				};
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
	searchChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}

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

	filterChanged(id?: number) {
		this.pager.filters[id] =  this.selected[id].map((elem: any) => elem.id).join(',');
		this.getData();
	}
	singleFilterChanged(id?: number) {
		this.pager.filters[id] =  this.selected[id].id;
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
