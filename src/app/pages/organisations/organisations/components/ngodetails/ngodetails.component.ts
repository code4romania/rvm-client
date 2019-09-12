import {
	Component,
	OnInit,
	ViewChild,
	AfterContentChecked,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, ParamMap } from '@angular/router';
import { OrganisationService } from '../../../organisations.service';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import {
	FormGroup,
	Validators,
	FormBuilder
} from '@angular/forms';
import { AuthenticationService } from '../../../../../core/authentication/authentication.service';

import { CitiesCountiesService } from '../../../../../core/service/cities-counties.service';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { Location } from '@angular/common';
import { FiltersService } from '@app/core';

interface Alert {
	type: string;
	message: string;
}

@Component({
	selector: 'app-ngodetails',
	templateUrl: './ngodetails.component.html',
	styleUrls: ['./ngodetails.component.scss']
})
export class NgodetailsComponent implements OnInit, AfterContentChecked {

	/**
	 * var that holds data about NGO, resources and volunteers
	 */
	data: any;
	resourceData: any[] = [];
	volunteersData: any[] = [];
	/**
	 * var that holds pager and filters for resources and volunteers
	 */
	resourcePager: any = {};
	resourceFiltersSelected = Array(2);
	volunteerPager: any = {};
	volunteerFiltersSelected = Array(2);
	/**
	 * flag for ngtemplate in HTML
	 */
	hasVolunteers = false;
	hasResources = false;
	/**
	 * flag used to get ID from link and pass it to get method
	 */
	ngoid: string;
	/**
	 * var for data to send when adding new resource. Only for DSU
	 */
	navigationExtras: NavigationExtras;
	/**
	 * Fliterable values
	 */
	volunteerTypeFilterValues: any[] = [];
	categoryFilterValues: any[] = [];
	specializationFilterValues: any[] = [];
	locationFilterValues: any[] = [];
	/**
	 * Tabs reference for vefifing which is open
	 */
	@ViewChild('tabRef', { static: true}) tabRef: NgbTabset;
	tabsInitialized = false;
	selectedTab = 'volunteers';

	/**
	 * flag for toast message
	 */
	messageSent = false;
	/**
	 * flag for when deleting
	 */
	loading = false;

	propertyMap = {
		'_id': 'id',
		'parent_id': 'parent_id'
	};

	currentVolunteerId = '';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public authService: AuthenticationService,
		private organisationService: OrganisationService,
		private modalService: NgbModal,
		private filterService: FiltersService,
		private location: Location,
		private citiesandcounties: CitiesCountiesService,
		private resourceService: ResourcesService
	) {
		/**
		 * set a specific open tab if necessary
		 */
		const navigation = this.router.getCurrentNavigation();

		if (navigation && navigation.extras && navigation.extras.state) {
			this.selectedTab = navigation.extras.state.tabName;
		}
	}

	ngOnInit() {
		/**
		 * get filter values
		 */
		this.citiesandcounties.getCounties().subscribe((response: any) => {
			const aux = response;
			aux.map((elem: { id: any; _id: any; }) => elem.id = elem._id);
			this.locationFilterValues = aux;
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
		this.filterService.getSpecializationFilters().subscribe((data) => {
			this.specializationFilterValues = data.map((elem: any) => {
				return {id: elem._id, name: elem.name};
			});
		});
		/**
		 * get current id, init pager, and get all data with the id
		 */
		this.ngoid = this.route.snapshot.paramMap.get('id');
		this.volunteerPager = this.organisationService.getVolunteerPager();
		this.resourcePager = this.organisationService.getResourcePager();
		this.getData();
		this.getResources();
		this.getVolunteers();
	}
	/**
		 * switch tab of necessary
		 */
	ngAfterContentChecked() {
		if (this.tabRef.tabs) {
			this.tabRef.select(this.selectedTab);
		}
	}
	/**
		 * get org data
		 */
	getData() {
		this.organisationService.getorganisation(this.ngoid).subscribe(data => {
			this.data = data;
			this.navigationExtras = {
				state: {
					ngo: {
						name: data.name,
						_id: this.ngoid
					}
				}
			};
		});
	}
/**
		 * switch volunteers data
		 */
	getVolunteers() {
		this.organisationService.getVolunteersbyorganisation(this.ngoid, this.volunteerPager).subscribe(data => {
			if (data.data[0]) {
				this.volunteerPager.total = data.pager.total;
				this.hasVolunteers = true;

				if (!!data.data.courses) {
					data.data.courses = data.data.courses.reverse();
				}

				this.volunteersData = data.data;
			} else {
				this.hasVolunteers = false;
			}
		});
	}
/**
		 * switch resources of necessary
		 */
	getResources() {
		this.organisationService.getResourcesbyorganisation(this.ngoid, this.resourcePager).subscribe(data => {
			if (data.data[0]) {
				this.hasResources = true;
				this.resourceData = data.data;
				this.resourcePager.total = data.pager.total;
			} else {
				this.hasResources = false;
			}
		});
	}

	resourcefilterChanged(id: number) {
		this.resourcePager.filters[id] =  this.resourceFiltersSelected[id].map((elem: any) => elem.id).join(',');
		this.getResources();
	}

	volunteerfilterChanged(id: number) {
		this.volunteerPager.filters[id] = this.volunteerFiltersSelected[id].map((elem: any) => elem.id).join(',');
		this.getVolunteers();
	}

	/**
	 * open add resource modal
	 */
	editResource(resource: any) {
		this.router.navigateByUrl(`/resources/edit/${resource._id}`);
	}

	/**
	 * submit form and close modal
	 */
	deleteSelf() {
		if (this.authService.user._id === this.data._id) {
			if (confirm('Sunteți sigur că doriți să vă ștergeți contul?')) {
				this.loading = true;
				this.organisationService.deleteorganisation(this.ngoid).subscribe(data => {
					this.loading = false;
					this.authService.setCredentials();
					this.router.navigateByUrl('/login');
				}, () => {
					this.location.back();
				});
			}
		} else {
			if (confirm('Sunteți sigur că doriți să ștergeți această intrare? Odată ștearsă nu va mai putea fi recuperată.')) {
				this.loading = true;
				this.organisationService.deleteorganisation(this.ngoid).subscribe(data => {
					this.loading = false;
					this.router.navigateByUrl('/organisations');
				}, () => {
					this.loading = false;
				});
			}
		}
	}

	addresource() {
		this.router.navigateByUrl('/resources/add', this.navigationExtras);
	}

	addvolunteer() {
		this.router.navigateByUrl('/volunteers/add', this.navigationExtras);
	}

	sortChanged(pager: any) {
		if (this.selectedTab === 'volunteers') {
			this.volunteerPager = pager;
			this.getVolunteers();
		} else {
			this.resourcePager = pager;
			this.getResources();
		}
	}

	searchChanged(pager: any) {
		if (pager.search !== '') {
			if (this.selectedTab === 'volunteers') {
				this.volunteerPager = pager;
				this.getVolunteers();
			} else {
				this.resourcePager = pager;
				this.getResources();
			}
		}
	}

	sendNotification() {
		this.organisationService.sendUpdateDataEmail(this.ngoid).subscribe(() => {
			this.messageSent = true;
			setTimeout(() => this.close(), 5000);
		});
	}

	close() {
		this.messageSent = false;
	}

	openMenu(volunteerId: string, status: boolean) {
		if (status) {
			this.currentVolunteerId = volunteerId;
		} else {
			this.currentVolunteerId = null;
		}
	}

	canEdit() {
		if (this.data) {
			return this.authService.is('DSU') || (this.authService.is('NGO') && this.data._id === this.authService.user.organisation._id);
		} else {
			return false;
		}
	}
}
