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
	volunteersData: any = [];
	pager: any = {};
	filterResult: any = {};
	displayBlock = true;
	selected = Array(3);

	NGOFilterValues: any[];
	locationFilterValues: any[];
	specializationFilterValues: any[];

	constructor(private volunteerService: VolunteerService, public breakpointObserver: BreakpointObserver,
			private citiesandcounties: CitiesCountiesService, private filterService: FiltersService,
			public authService: AuthenticationService, private router: Router) { }

	ngOnInit() {

		this.pager = this.volunteerService.getPager();

		this.getData();
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

		/* subscribe to screen size in order to use list instead of grid for display */
		this.breakpointObserver.observe([
			'(max-width: 768px)'
		]).subscribe(result => {
			if (result.matches) {
				this.switchtoblock();
			}
		});
	}

	getData() {
		this.volunteerService.getVolunteers(this.pager).subscribe((element: any) => {
			if (element) {
				this.volunteersData = element.data;
				this.pager.total = element.pager.total;
			}
		});
	}

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

	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}

	searchChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}

	filterChanged(id?: number) {
		console.log(this.selected[id]);
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

	goToOrganisation(id: string, e: any) {
		e.preventDefault();
		this.router.navigate(['../organisations/id/' + id]);
	}

}
