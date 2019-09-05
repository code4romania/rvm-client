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
	resourcePager: any = {};
	volunteerPager: any = {};
	hasVolunteers = false;
	hasResources = false;
	resourceData: any[] = [];
	volunteersData: any[] = [];
	isValid = true;
	form: FormGroup;
	counties: String[] = [];
	cities: String[] = [];
	navigationExtras: NavigationExtras;
	cityPlaceholder = 'Selectați mai întâi județul';
	resourcePlaceholder = 'Selectați mai întâi categoria';
	multiselectconfig = {
		displayKey: 'name', // if objects array passed which key to be displayed defaults to description
		search: true, // true/false for the search functionlity defaults to false,
		height: '100', // height of the list so that if there are more no of items it can show a scroll defaults to auto
		limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
		moreText: 'altele', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
		noResultsFound: 'Niciun rezultat!', // text to be displayed when no items are found while searching
		searchPlaceholder: 'Cauta', // label thats displayed in search input,
		searchOnKey: 'name', // key on which search should be performed this will be selective search.
							// if undefined this will be extensive search on all keys
		};
	volunteerconfig = {...{placeholder: 'Tipul'}, ...this.multiselectconfig};
	locationconfig = {...{placeholder: 'Judet'}, ...this.multiselectconfig};
	typeconfig = {...{placeholder: 'Categorie'}, ...this.multiselectconfig};
	specializationconfig = {...{placeholder: 'Specializare'}, ...this.multiselectconfig};
	volunteerTypeFilterValues: any[] = [];
	resourceTypeFilterValues: any[] = [];
	specializationFilterValues: any[] = [];
	locationFilterValues: any[] = [];
	ngoid: string;
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
		private fb: FormBuilder,
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

		this.citiesandcounties.getCounties().subscribe((response: {data: any[], pager: any}) => {
			this.locationFilterValues = response.data;
		});


		this.form = this.fb.group({
			_id: '',
			type_name: ['', Validators.required],
			name: [{ value: '', disabled: true }, Validators.required],
			quantity: ['', Validators.required],
			city: [{ value: '', disabled: true }, Validators.required],
			county: ['', Validators.required],
			comments: ''
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

	resourceFilterChanged(data: any, id: string) {
		this.resourcePager.filters[id] =  data.value.map((elem: { name: any; }) => elem.name).join(',');
		this.getResources();
	}

	volunteerFilterChanged(data: any, id: string) {
		this.volunteerPager.filters[id] =  data.value.map((elem: { name: any; }) => elem.name).join(',');
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

	onSubmit() {
		this.form.controls['organisation_id'].setValue(
			this.route.snapshot.paramMap.get('id')
		);
		this.organisationService
			.addResource(this.form.value)
			.subscribe((element: any) => {
				this.modalService.dismissAll();
		});
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
		if (this.selectedTab === 'volunteers') {
			this.volunteerPager = pager;
		} else {
			this.resourcePager = pager;
		}
		this.getData();
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
