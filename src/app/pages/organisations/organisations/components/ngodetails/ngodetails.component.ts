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
	data: any;
	resourceData: any[] = [];
	volunteersData: any[] = [];

	resourcePager: any = {};
	resourceFiltersSelected = Array(2);
	volunteerPager: any = {};
	volunteerFiltersSelected = Array(2);

	hasVolunteers = false;
	hasResources = false;

	ngoid: string;
	navigationExtras: NavigationExtras;

	volunteerTypeFilterValues: any[] = [];
	resourceTypeFilterValues: any[] = [];
	specializationFilterValues: any[] = [];
	locationFilterValues: any[] = [];

	@ViewChild('tabRef', { static: true}) tabRef: NgbTabset;
	tabsInitialized = false;
	selectedTab = 'volunteers';


	messageSent = false;
	loading = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public authService: AuthenticationService,
		private organisationService: OrganisationService,
		private modalService: NgbModal,
		private location: Location,
		private citiesandcounties: CitiesCountiesService,
		private resourceService: ResourcesService
	) {
		const navigation = this.router.getCurrentNavigation();

		if (navigation && navigation.extras && navigation.extras.state) {
			this.selectedTab = navigation.extras.state.tabName;
		}
	}

	ngOnInit() {

		this.citiesandcounties.getCounties().subscribe((response: any) => {
			const aux = response;
			aux.map((elem: { id: any; _id: any; }) => elem.id = elem._id);
			this.locationFilterValues = aux;
		});

		this.ngoid = this.route.snapshot.paramMap.get('id');
		this.getData();
		this.getResources();
		this.getVolunteers();
	}

	ngAfterContentChecked() {
		if (this.tabRef.tabs) {
			this.tabRef.select(this.selectedTab);
		}
	}

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

	getVolunteers() {
		this.volunteerPager = this.organisationService.getVolunteerPager();
		this.organisationService.getVolunteersbyorganisation(this.ngoid, this.volunteerPager).subscribe(data => {
			if (data.data[0]) {
				this.hasVolunteers = true;
				this.volunteersData = data.data;
			} else {
				this.hasVolunteers = false;
			}
		});
	}

	getResources() {
		this.resourcePager = this.organisationService.getResourcePager();
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

	resourceFilterChanged(id: string) {
		this.resourcePager.filters[id] =  this.resourceFiltersSelected.map((elem: { name: any; }) => elem.name).join(',');
		this.getResources();
	}

	volunteerFilterChanged(id: string) {
		this.volunteerPager.filters[id] = this.volunteerFiltersSelected.map((elem: { name: any; }) => elem.name).join(',');
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

	// clear() {
	// 	this.authService.setCredentials();
	// }

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
		// if (this.selectedTab === 'volunteers') {
		// 	this.volunteerPager = pager;
		// } else {
		// 	this.resourcePager = pager;
		// }
		// this.getData();
		if (pager.search !== '') {
			if (this.selectedTab === 'volunteers') {
				this.volunteersData = this.volunteersData.filter((elem: any) => {
					return elem.name.toLowerCase().indexOf(pager.search) > -1;
				});
			} else {
				this.resourceData = this.resourceData.filter((elem: any) => {
					return elem.name.toLowerCase().indexOf(pager.search) > -1;
				});
			}
		} else {
			this.getData();
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
}
