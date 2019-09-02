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
		locationconfig = {...{placeholder: 'Judet'}, ...this.multiselectconfig};
		typeconfig = {...{placeholder: 'Tip'}, ...this.multiselectconfig};
		ngoconfig = {...{placeholder: 'ONG'}, ...this.multiselectconfig};
		specializationconfig = {...{placeholder: 'Specializare'}, ...this.multiselectconfig};

	typeFilterValues: any[];
	NGOFilterValues: any[];
	locationFilterValues: any[];
	specializationFilterValues: any[];

	constructor(private volunteerService: VolunteerService, public breakpointObserver: BreakpointObserver,
			private citiesandcounties: CitiesCountiesService, private filterService: FiltersService,
			public authService: AuthenticationService, private router: Router) { }

	ngOnInit() {

		this.pager = this.volunteerService.getPager();
		if (this.authService.is('NGO')) {
			// TODO cu filtre DE LA backend
			// this.pager.filters[3] = '4a7d54364a7156b6c12e5492cb0016f1';
		}

		this.getData();
		this.citiesandcounties.getCounties('', true).subscribe((response: {data: any[], pager: any}) => {
			this.locationFilterValues = response.data;
		});

		this.filterService.getOrganisationsFilters().subscribe((data) => {
			this.NGOFilterValues = data.map((elem: any) => {
				return {id: elem.name, name: elem.name};
				});
			// this.ngofilterResult = data.map((elem:any) => elem.name);
		});

		// TODO WHEN BACKEND FINISHED
		// this.filterService.getVolunteerTypeFilters().subscribe((data) => {
		// 	this.typeFilterValues = data.map((elem: any) => {
		// 		return {id: elem.type_name, name: elem.type_name};
		// 		});
		// });
		// this.filterService.getSpecializationFilters().subscribe((data) => {
		// 	this.specializationFilterValues = data.map((elem: any) => {
		// 		return {id: elem.name, name: elem.name};
		// 	});
		// });

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
						name: 'Curcea Rosie',
						ngoid: '7eb1c58d-703a-43a4-a9d3-0f8324550def'
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
		if (pager.search !== '') {
			this.volunteersData = this.volunteersData.filter((elem: any) => {
				return elem.name.toLowerCase().indexOf(pager.search) > -1;
			});
		} else {
			this.getData();
		}
	}

	filterChanged = (data?: any, id?: string) => {
		this.pager.filters[id] =  data.value.map((elem: any) => elem._id).join(',');
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
