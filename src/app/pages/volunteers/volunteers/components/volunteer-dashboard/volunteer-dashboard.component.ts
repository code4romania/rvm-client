import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { VolunteerService } from '../../../volunteers.service';
import { CitiesCountiesService, FiltersService, AuthenticationService } from '@app/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-volunteer-dashboard',
	templateUrl: './volunteer-dashboard.component.html',
	styleUrls: ['./volunteer-dashboard.component.scss']
})
export class VolunteerDashboardComponent implements OnInit {
		/**
	 * store the volunteers list
	 */
	volunteersData: any = [];
		/**
	 * pager for the resources table
	 */
	pager: any = {};
	/**
	 * flag for HTML to know how to display data
	 */
	displayBlock = true;
	/**
	 * selected filters array
	 */
	selected = Array(3);
	/**
	 *values to select from when filtering
	 */
	NGOFilterValues: any[];
	locationFilterValues: any[];
	specializationFilterValues: any[];

	constructor(private volunteerService: VolunteerService, public breakpointObserver: BreakpointObserver,
			private citiesandcounties: CitiesCountiesService, private filterService: FiltersService,
			public authService: AuthenticationService, private router: Router) { }

	ngOnInit() {
		this.volunteerService.setPager();
		this.pager = this.volunteerService.getPager();

		this.getData();
		/**
		 * get filterable values
		 */
		this.citiesandcounties.getCounties('').subscribe((response:  any) => {
			const aux = response;
			aux.map((elem: { id: any; _id: any; }) => elem.id = elem._id);
			this.locationFilterValues = aux;
		});

		this.filterService.getorganisationbyName('').subscribe((data) => {
			this.NGOFilterValues = data.map((elem: any) => {
				return {id: elem._id, name: elem.name};
				});
			// this.ngofilterResult = data.map((elem:any) => elem.name);
		});
		this.filterService.getSpecializationFilters().subscribe((data) => {
			this.specializationFilterValues = data.map((elem: any) => {
				return {id: elem._id, name: elem.name};
			});
		});

		/**
	 *observe screen chage and and switch to grid view if screen is too smal
	 */
		this.breakpointObserver.observe([
			'(max-width: 768px)'
		]).subscribe(result => {
			if (result.matches) {
				this.switchtoblock();
			}
		});
	}
/**
	 * get data from server and store localy

	 */
	getData() {
		this.volunteerService.getVolunteers(this.pager).subscribe((element: any) => {
			if (element) {
				this.volunteersData = element.data;
				this.pager.total = element.pager.total;
			}
		});
	}
/**
	 * send user to add volunteers. if is NGO the ngo id is static.
	 */
	addvolunteer() {
		if (this.authService.is('NGO')) {
			const navigationExtras = {
				state: {
					ngo: {
						// TODO: extragere informatiilor din contu utilizatorului
						name: this.authService.user.organisation.name,
						ngoid: this.authService.user.organisation._id
					}
				}
			};
			this.router.navigateByUrl('/volunteers/add', navigationExtras);
		} else {
			this.router.navigate(['volunteers/add']);
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
		console.log(this.selected[id]);
		this.pager.filters[id] =  this.selected[id].map((elem: any) => elem.id).join(',');
		this.getData();
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
	/**
	 * navigate to organisation by id
	 * @param {string} id of the NGO to display
	 */
	goToOrganisation(id: string, e: any) {
		e.preventDefault();
		this.router.navigate(['../organisations/id/' + id]);
	}

}
