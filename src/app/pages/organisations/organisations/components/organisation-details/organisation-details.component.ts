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
	selector: 'app-organisation-details',
	templateUrl: './organisation-details.component.html',
	styleUrls: ['./organisation-details.component.scss']
})
export class NgodetailsComponent implements OnInit, AfterContentChecked {

	/**
	 * var that holds data about NGO, resources and volunteers
	 */
	needupdate = false;
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
	updateSent = false;
	/**
	 * flag for when deleting
	 */
	loading = false;
	/**
	* mapping of object keys to filter recognizable keys
	*/
	propertyMap = {
		'_id': 'id',
		'parent_id': 'parent_id'
	};

	currentVolunteerId = '';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private resourceService: ResourcesService,
		public authService: AuthenticationService,
		private organisationService: OrganisationService,
		private filterService: FiltersService,
		private location: Location,
		private citiesandcounties: CitiesCountiesService,
	) {
		if (this.router.url.indexOf('validate') > -1) {
			this.needupdate = true;
		}
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
		 * get values that can be queried for the filters
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
		 * get volunteers data
		 */
	getVolunteers() {
		this.organisationService.getVolunteersbyorganisation(this.ngoid, this.volunteerPager).subscribe(data => {
			this.volunteerPager.total = data.pager.total;
			if (data.data[0]) {
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
		 * get resourcesData
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
	/**
		 * resource filter callback. Filters added to pager and then a request is made
		 * @param {number} id the index in the pager filters and filters Selected array
		 */
	resourcefilterChanged(id: number) {
		this.resourcePager.filters[id] =  this.resourceFiltersSelected[id].map((elem: any) => elem.id).join(',');
		this.getResources();
	}
/**
	 * volunteer filter callback. Filters added to pager and then a request is made
	 * @param {number} id the index in the pager filters and filters Selected array
	 */
	volunteerfilterChanged(id: number) {
		this.volunteerPager.filters[id] = this.volunteerFiltersSelected[id].map((elem: any) => elem.id).join(',');
		this.getVolunteers();
	}
	deleteRes(id: string) {
		this.resourceService.deleteResource(id).subscribe(resp => {
			this.getResources();
		});
	}
	/**
	 * delete NGO
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
	/**
	 *  navigate to add resource with ngo data
	 */
	addresource() {
		this.router.navigateByUrl('/resources/add', this.navigationExtras);
	}
	/**
	 *  navigate to add volunteer with ngo data
	 */
	addvolunteer() {
		this.router.navigateByUrl('/volunteers/add', this.navigationExtras);
	}
	/**
	* sort callback for volunteers table
	*/
	volunteerSortChanged(pager: any) {
		this.volunteerPager = pager;
		this.getVolunteers();
	}
	/**
	* sort callback for resource table
	*/
	resourceSortChanged(pager: any) {
		this.resourcePager = pager;
			this.getResources();
	}
/**
	* search callback for both tabels
	*/
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
	/**
	* send manual notification and trigger popup
	*/
	sendNotification() {
		this.organisationService.sendUpdateDataEmail(this.ngoid).subscribe(() => {
			this.messageSent = true;
			setTimeout(() => this.close(), 5000);
		});
	}
	validateinfo() {
		this.organisationService.updated(this.ngoid).subscribe(() => {
			this.updateSent = true;
			setTimeout(() => this.close(), 5000);
		});
	}
	/**
	* manual close for message send popup
	*/
	close() {
		this.messageSent = false;
		this.updateSent = false;
	}
	/**
	* expand volunteer specialization row for a specific volunteer
	* @param {string} volunteerId  of the current voluneer that is referenced
	* @param {boolean} status is open or is cloed
	*/
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
