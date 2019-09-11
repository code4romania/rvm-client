import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CitiesCountiesService } from '../../../../../core/service/cities-counties.service';
import { Subject } from 'rxjs/internal/Subject';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	switchMap
} from 'rxjs/operators';
import { merge } from 'rxjs';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { OrganisationService } from '@app/pages/organisations/organisations.service';
import { AuthenticationService, FiltersService, UtilService } from '@app/core';
import { Location, isPlatformWorkerApp } from '@angular/common';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { LocationValidation } from '@app/core/validators/location-validation';

@Component({
	selector: 'app-add-resource',
	templateUrl: './add-resource.component.html',
	styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
	form: FormGroup;
	edit = false;
	res: any;
	countyid: string;
	categoryid: string;
	cityPlaceholder = 'Selectați mai întâi județul';
	resourcePlaceholder = 'Selectați mai întâi categoria';
	fixedOrg: any = undefined;

	@ViewChild('instance', { static: true }) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance1: NgbTypeahead;
	focus1$ = new Subject<string>();
	click1$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance2: NgbTypeahead;
	focus2$ = new Subject<string>();
	click2$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance3: NgbTypeahead;
	focus3$ = new Subject<string>();
	click3$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance4: NgbTypeahead;
	focus4$ = new Subject<string>();
	click4$ = new Subject<string>();
	cities: any[] = [];
	categories: any[] = [];
	loading = false;
	loadingCities = false;

	subCategories: any[] = [];

	constructor(private resourcesService: ResourcesService,
		private route: ActivatedRoute,
		private location: Location, private router: Router,
		private citiesandCounties: CitiesCountiesService,
		private fb: FormBuilder, private utilService: UtilService,
		private filterService: FiltersService,
		public authService: AuthenticationService) {

			const navigation = this.router.getCurrentNavigation();
			if (navigation && navigation.extras && navigation.extras.state) {
				this.fixedOrg = navigation.extras.state.ngo;
			}

			this.filterService.getSubCategories('0', '').subscribe((elem: any) => {
				this.categories = elem;
			});

	}

	ngOnInit() {
		this.getResourceDetails(this.route.snapshot.paramMap.get('id'));
		this.form = this.fb.group({
			subCategory: [{value: '', disabled: true}],
			name: ['', Validators.required],
			address: '',
			resource_type: ['', Validators.required],
			category:  ['', Validators.required],
			organisation: this.authService.is('NGO') ?
								[{value: {name: this.authService.user.organisation.name, _id: this.authService.user.organisation._id},
									disabled: true }, Validators.required]
								:	this.fixedOrg ?
									[{value: {name: this.fixedOrg.name, _id: this.fixedOrg._id},
										disabled: false }, Validators.required]
										:	[{value: '' , disabled: false }, Validators.required],
			quantity: ['', [Validators.required, Validators.min(1)]],
			city: [{ value: '', disabled: true }, Validators.required],
			county: ['', Validators.required],
			comments: ''
		});
	}

	getResourceDetails(resId: string) {
		if (resId) {
			this.edit = true;
			this.resourcesService.getResource(resId).subscribe(data => {
				this.res = data;
				this.countyid = this.res.county._id;
				this.form = this.fb.group({
					name: this.res.name,
					subCategory: '',
					address: this.res.address,
					resource_type: [this.res.resource_type, Validators.required],
					category: [this.res.categories[0], Validators.required],
					organisation: [{value: this.res.organisation, disabled: this.authService.is('NGO')} , Validators.required],
					quantity: [this.res.quantity, [Validators.required, Validators.min(0)]],
					city: [this.res.city, [Validators.required, LocationValidation.locationValidation]],
					county: [this.res.county, [Validators.required, LocationValidation.locationValidation]],
					comments: this.res.comments
				});
				if (this.res.categories[1]) {
					this.form.patchValue({subCategory: this.res.categories[1]});
				}
			});
		}
	}

	formatter = (result: { name: string }) => result.name;
	searchcounty = (text$: Observable<string>) => {

		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);
		const clicksWithClosedPopup$ = this.click1$.pipe(
			filter(() => !this.instance1.isPopupOpen())
		);
		const inputFocus$ = this.focus1$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			switchMap((term: string) => this.citiesandCounties.getCounties(term))
		);
	}

	searchcity = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);
		const clicksWithClosedPopup$ = this.click2$.pipe(
			filter(() => !this.instance2.isPopupOpen())
		);
		const inputFocus$ = this.focus2$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term: string) => {
				if (term === '') {
					return this.cities;
				} else {
					return this.cities.filter(v => {
						const aux: String = this.utilService.removeDiacritics(v.name).toLowerCase();
						return aux.indexOf(term.toLowerCase()) > -1;
					}).slice(0, 20);
				}
			}));
	}

	searchOrganisation = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);

		const clicksWithClosedPopup$ = this.click$.pipe(
			filter(() => !this.instance.isPopupOpen())
		);

		const inputFocus$ = this.focus$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			switchMap((term: string) => {
				return this.filterService.getorganisationbyName(term);
		}));
	}

	selectedCounty(val: any) {
		this.form.controls.county.markAsTouched();
		if (val.item && val.item._id) {
			this.countyid = val.item._id;
			this.form.patchValue({county: val.item});
			this.loadingCities = true;
			this.citiesandCounties.getCitiesbyCounty(this.countyid, '').subscribe((res: any) => {
				this.cities = res;
				this.loadingCities = false;
				this.form.controls.city.enable();
			});
			this.cityPlaceholder = 'Alegeți Orașul';
		} else if (this.form.controls.county.value.name && val !== this.form.controls.county.value.name) {
			this.form.patchValue({county: '', city: ''});
		}
	}

	countykey(event: any) {
		this.form.controls.county.markAsTouched();
		if (event.code !== 'Enter') {
			this.cities = [];
			this.form.controls.city.disable();
			this.form.controls.city.reset('');
			this.cityPlaceholder = 'Selectați mai întâi județul';
		}
	}

	selectedCity(val: { item: any }) {
		this.form.controls.city.markAsTouched();
		this.form.patchValue({city: val.item});
	}

	selectedOrganisation(val: any) {
		this.form.controls.organisation.markAsTouched();
		if (val.item && val.item._id) {
			this.form.patchValue({organisation: val.item});
		} else if (this.form.controls.organisation.value.name && val !== this.form.controls.organisation.value.name) {
			this.form.patchValue({organisation: ''});
		}
	}

	selectedCategory() {
		this.form.controls.category.markAsTouched();
		if (this.form.value.category) {
			this.categoryid = this.form.value.category;
			this.filterService.getSubCategories(this.categoryid, '').subscribe(resp => {
				if (resp.length > 0) {
					this.form.controls.subCategory.enable();
					this.resourcePlaceholder = 'Alegeți Categoria';
					this.subCategories = resp;
				} else {
					this.form.controls.subCategory.disable();
					this.form.controls.subCategory.reset('');
					this.resourcePlaceholder = 'Selectați mai întâi categoria';
				}
			});
		}
	}

	/**
	 * Send data from form to server. If success close page
	 */
	onSubmit() {
		this.loading = true;
		const resource = this.form.value;
		resource.organisation_id = this.form.value.organisation._id;
		resource.county = resource.county._id;
		resource.city = resource.city._id;
		resource.categories = [resource.category];
		if (resource.subCategory) {
			resource.categories.push(resource.subCategory);
		}

		if (this.edit) {
			this.resourcesService.editResource(this.res._id, resource)
			.subscribe((element: any) => {
				this.loading = false;
				this.location.back();
			}, () => {
				this.loading = false;
			});
		} else {
			this.resourcesService
				.addResource(resource)
				.subscribe((element: any) => {
					this.loading = false;
					this.location.back();
				}, () => {
					this.loading = false;
				});
		}
	}

}
