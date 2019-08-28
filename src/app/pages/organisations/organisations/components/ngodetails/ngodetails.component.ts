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
import { map, take } from 'rxjs/operators';

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

	locationconfig = {...{placeholder: 'Locatie'}, ...this.multiselectconfig};
	typeconfig = {...{placeholder: 'Tip'}, ...this.multiselectconfig};
	specializationconfig = {...{placeholder: 'Specializare'}, ...this.multiselectconfig};
	volunteerTypeFilterValues: any[] = [];
	resourceTypeFilterValues: any[] = [];
	specializationFilterValues: any[] = [];
	locationFilterValues: any[] = [];
	ngoid: string;
	@ViewChild('tabRef', { static: true}) tabRef: NgbTabset;
	tabsInitialized = false;
	selectedTab = 'volunteers';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public authService: AuthenticationService,
		private organisationService: OrganisationService,
		private modalService: NgbModal,
		private fb: FormBuilder,
		private citiesandCounties: CitiesCountiesService,
		private resourceService: ResourcesService
	) {
		const navigation = this.router.getCurrentNavigation();

		if (navigation && navigation.extras && navigation.extras.state) {
			this.selectedTab = navigation.extras.state.tabName;
		}
	}

	ngOnInit() {

		this.citiesandCounties.getCounties().subscribe((response: any[]) => {
			this.counties = response;
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
						ngoid: this.ngoid
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
		const navigationExtras: NavigationExtras = {
			state: {
				resource: resource
			}
		};
		this.router.navigateByUrl('/resources/add', navigationExtras);
	}

	/**
	 * submit form and close modal
	 */
	deleteRes(form: any) {
		const id = form.value._id;
		this.resourceService.deleteResource(id).subscribe(data => {
			this.modalService.dismissAll();
			this.getResources();
		});
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

	clear() {
		this.authService.setCredentials();
	}

	selectedCounty(val: { item: any }) {
		this.citiesandCounties.getCitiesbyCounty(val.item.name).subscribe(k => {
			this.cities = k;
			this.form.controls.city.enable();
			this.cityPlaceholder = 'Alegeți Orașul';
		});
	}


	sendNotification() {
		console.log('will send manual notification');
	}
}

	// searchResource = (text$: Observable<string>) => {
	// 	return text$.pipe(
	// 		debounceTime(200),
	// 		distinctUntilChanged(),
	// 		map(term =>
	// 		(term === ''
	// 			? this.cities
	// 			: this.cities.filter(
	// 				v =>
	// 					v.toLowerCase().indexOf(term.toLowerCase()) > -1
	// 				)
	// 			).slice(0, 10)
	// 		)
	// 	);
	// }
	// 	searchcounty = (text$: Observable<string>) => {
	// 	// const clicksWithClosedPopup$ = this.click$.pipe(
	// 	// 	filter(() => !this.instance.isPopupOpen())
	// 	// );
	// 	// const inputFocus$ = this.focus$;
	// 	// return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
	// 		return text$.pipe(
	// 			debounceTime(200),
	// 			distinctUntilChanged(),
	// 			map((term: string) => {
	// 				if (term === '') {
	// 					return this.counties;
	// 				} else {
	// 					return this.counties
	// 						.filter(
	// 							v =>
	// 								v.toLowerCase().indexOf(term.toLowerCase()) > -1
	// 						)
	// 						.slice(0, 10);
	// 				}
	// 			})
	// 	);
	// }
	// searchcity = (text$: Observable<string>) => {
	// 	// const debouncedText$ = text$.pipe(
	// 	// 	debounceTime(200),
	// 	// 	distinctUntilChanged()
	// 	// );
	// 	// const clicksWithClosedPopup$ = this.click1$.pipe(
	// 	// 	filter(() => !this.instance1.isPopupOpen())
	// 	// );
	// 	// const inputFocus$ = this.focus1$;
	// 	// return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
	// 		return text$.pipe(
	// 			debounceTime(200),
	// 			distinctUntilChanged(),
	// 			map(term =>
	// 			(term === ''
	// 				? this.cities
	// 				: this.cities.filter(
	// 					v =>
	// 						v.toLowerCase().indexOf(term.toLowerCase()) > -1
	// 					)
	// 				).slice(0, 10)
	// 			)
	// 		);
	// }
	// searchCategory = (text$: Observable<string>) => {
	// 	return text$.pipe(
	// 		debounceTime(200),
	// 		distinctUntilChanged(),
	// 		map(term =>
	// 		(term === ''
	// 			? this.cities
	// 			: this.cities.filter(
	// 				v =>
	// 					v.toLowerCase().indexOf(term.toLowerCase()) > -1
	// 				)
	// 			).slice(0, 10)
	// 		)
	// 	);
