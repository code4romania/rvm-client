import {
	Component,
	OnInit,
	Directive,
	Input,
	EventEmitter,
	Output,
	ViewChild,
	TemplateRef
} from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { OrganizationService } from '../../../organizations.service';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';
import { AuthenticationService } from '../../../../../core/authentication/authentication.service';

import { Observable, Subject, merge, of } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	map
} from 'rxjs/operators';
import { CitiesCountiesService } from '../../../../../core/service/cities-counties.service';
import { ResourcesService } from '@app/pages/resources/resources.service';

@Component({
	selector: 'app-ngodetails',
	templateUrl: './ngodetails.component.html',
	styleUrls: ['./ngodetails.component.scss']
})
export class NgodetailsComponent implements OnInit {
	data: any;
	hasVolunteers = false;
	hasResources = false;
	resourceData: any[] = [];
	volunteersData: any[] = [];
	isValid = true;
	form: FormGroup;
	counties: String[] = [];
	cities: String[] = [];
	cityPlaceholder = 'Selectați mai întâi județul';
	resourcePlaceholder = 'Selectați mai întâi categoria';
	@ViewChild('content', {static: true}) modalcontent: TemplateRef<any>;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
	focus1$ = new Subject<string>();
	click1$ = new Subject<string>();
	ngoid: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService,
		private organizationService: OrganizationService,
		private modalService: NgbModal,
		private fb: FormBuilder,
		private citiesandCounties: CitiesCountiesService,
		private resourceService: ResourcesService
	) {	}

	searchcounty = (text$: Observable<string>) => {
		// const clicksWithClosedPopup$ = this.click$.pipe(
		// 	filter(() => !this.instance.isPopupOpen())
		// );
		// const inputFocus$ = this.focus$;
		// return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			return text$.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				map((term: string) => {
					if (term === '') {
						return this.counties;
					} else {
						return this.counties
							.filter(
								v =>
									v.toLowerCase().indexOf(term.toLowerCase()) > -1
							)
							.slice(0, 10);
					}
				})
		);
	}

	searchcity = (text$: Observable<string>) => {
		// const debouncedText$ = text$.pipe(
		// 	debounceTime(200),
		// 	distinctUntilChanged()
		// );
		// const clicksWithClosedPopup$ = this.click1$.pipe(
		// 	filter(() => !this.instance1.isPopupOpen())
		// );
		// const inputFocus$ = this.focus1$;
		// return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			return text$.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				map(term =>
				(term === ''
					? this.cities
					: this.cities.filter(
						v =>
							v.toLowerCase().indexOf(term.toLowerCase()) > -1
						)
					).slice(0, 10)
				)
			);
	}

	searchCategory = (text$: Observable<string>) => {
		return text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map(term =>
			(term === ''
				? this.cities
				: this.cities.filter(
					v =>
						v.toLowerCase().indexOf(term.toLowerCase()) > -1
					)
				).slice(0, 10)
			)
		);
	}

	searchResource = (text$: Observable<string>) => {
		return text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map(term =>
			(term === ''
				? this.cities
				: this.cities.filter(
					v =>
						v.toLowerCase().indexOf(term.toLowerCase()) > -1
					)
				).slice(0, 10)
			)
		);
	}

	ngOnInit() {
		this.counties = this.citiesandCounties.getCounties();
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

	getData() {
		this.organizationService.getOrganization(this.ngoid).subscribe(data => {
			this.data = data;
		});
	}

	getResources() {
		this.organizationService.getResourcesbyOrganization(this.ngoid).subscribe(data => {
			if (data.data[0]) {
				this.hasResources = true;
				this.resourceData = data.data;
			} else {
				this.hasResources = false;
			}
		});
	}

	getVolunteers() {
		this.organizationService.getVolunteersbyOrganization(this.ngoid).subscribe(data => {
			if (data.data[0]) {
				this.hasVolunteers = true;
				this.volunteersData = data.data;
			} else {
				this.hasVolunteers = false;
			}
		});
	}

	/**
	 * open add resource modal
	 */
	editResource(resource: any) {
		this.form.controls.city.enable();
		this.form.controls.name.enable();
		this.form.patchValue(resource);
		this.openVerticallyCentered(this.modalcontent);
	}

	openVerticallyCentered(content: any) {
		this.modalService.open(content, { centered: true });
	}

	/**
	 * submit form and close modal
	 */
	deleteRes(form: any) {
		const id = form.value._id;
		this.resourceService.deleteResource(id).subscribe(data => {
			// console.log(data);
			this.modalService.dismissAll();
			this.getResources();
		});
	}

	onSubmit() {
		this.form.controls['organisation_id'].setValue(
			this.route.snapshot.paramMap.get('id')
		);
		this.organizationService
			.addResource(this.form.value)
			.subscribe((element: any) => {
				console.log(element);
				this.modalService.dismissAll();
		});
	}

	addvolunteer() {
		const navigationExtras: NavigationExtras = {
			state: {
				ngo: {
					name: this.data.name,
					orgid: this.data._id
				}
			}
		};
		this.router.navigateByUrl('/volunteers/add', navigationExtras);
	}

	clear() {
		this.authService.setCredentials();
	}

	selectedCounty(val: { item: string }) {
		this.citiesandCounties.getCitiesbyCounty(val.item).subscribe(k => {
			this.cities = k;
			this.form.controls.city.enable();
			this.cityPlaceholder = 'Alegeti Orasul';
		});
	}

	selectedCategory(val: { item: string }) {
		// this.citiesandCounties.getCitiesbyCounty(val.item).subscribe(k => {
			// this.cities = k;
			this.form.controls.city.enable();
			this.resourcePlaceholder = 'Alegeti Resursa';
		// });
	}
}
