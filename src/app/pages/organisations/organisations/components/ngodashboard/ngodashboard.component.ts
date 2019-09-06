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
	typeFilterValues = [{id: 1, name: 'Nationala'}, {id: 2, name: 'Locala'}];
	specializationFilterValues: any[];
	locationFilterValues: any[];

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
		this.citiesandcounties.getCounties('', true).subscribe((response: {data: any[], pager: any}) => {
			this.locationFilterValues = response.data;
		});

		this.filterService.getSpecializationFilters().subscribe((data) => {
			this.specializationFilterValues = data.map((elem: any) => {
				return {id: elem._id, name: elem.name};
			});
		});
		this.filterService.getCategoryFilters().subscribe((data) => {
			this.categoryFilterValues = data.data.map((elem: any) => {
				return {id: elem._id, name: elem.name};
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
		if (pager.search !== '') {
			this.ngosData = this.ngosData.filter((elem: any) => {
				return elem.name.toLowerCase().indexOf(pager.search) > -1;
			});
		} else {
			this.getData();
		}
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

	filterChanged = (id?: number) => {
		this.pager.filters[id] =  this.selected[id].map((elem: any) => elem.id).join(',');
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
