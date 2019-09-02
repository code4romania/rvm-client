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
import { AuthenticationService, CategoriesService } from '@app/core';
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

	constructor(private resourcesService: ResourcesService,
		private route: ActivatedRoute, private catService: CategoriesService,
		private location: Location, private router: Router,
		private citiesandCounties: CitiesCountiesService,
		private fb: FormBuilder,
		private orgService: OrganisationService,
		public authService: AuthenticationService) {
			const navigation = this.router.getCurrentNavigation();
			if (navigation && navigation.extras && navigation.extras.state) {
				this.fixedOrg = navigation.extras.state.ngo;
			}
	}

	ngOnInit() {
		this.getResourceDetails(this.route.snapshot.paramMap.get('id'));
		this.form = this.fb.group({
			subCategory: [{value: '', disabled: true}, Validators.required],
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
				this.categoryid = this.res.category._id;
				this.form = this.fb.group({
					name: this.res.name,
					subCategory: [this.res.subCategory, Validators.required],
					address: this.res.address,
					resource_type: [this.res.resource_type, Validators.required],
					category: [this.res.category, Validators.required],
					organisation: [{value: this.res.organisation, disabled: this.authService.is('NGO')} , Validators.required],
					quantity: [this.res.quantity, [Validators.required, Validators.min(0)]],
					city: [this.res.city, [Validators.required, LocationValidation.locationValidation]],
					county: [this.res.county, [Validators.required, LocationValidation.locationValidation]],
					comments: this.res.comments
				});
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
			switchMap((term: string) => {
				return this.citiesandCounties.getCounties(term).pipe(
					map((response: {data: any[], pager: any}) => {
						console.log(response);
						return response.data;
					})
				);
			})
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
			switchMap((term: string) => {
				if (this.countyid) {
					return this.citiesandCounties.getCitiesbyCounty(this.countyid, term).pipe(
						map((response: {data: any[], pager: any}) => {
							console.log(response);
							return response.data;
						})
					);
				} else {
					return [];
				}
			})
		);
	}
	searchCategory = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);
		const clicksWithClosedPopup$ = this.click3$.pipe(
			filter(() => !this.instance3.isPopupOpen())
		);
		const inputFocus$ = this.focus3$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			switchMap((term: string) => {
				return this.catService.getSubCategories('0', term).pipe(
					map( (response: {data: any[]}) => response.data ),
					map(x => {
						console.log(x);
						if (x.length === 0) {
							return [{id: 'd021817b6d80d7da09bece2bebc584ac', name: 'Altele'}];
						} else { return x; }
					})
				);
		}));
	}

	searchSubcat = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);
		const clicksWithClosedPopup$ = this.click4$.pipe(
			filter(() => !this.instance4.isPopupOpen())
		);
		const inputFocus$ = this.focus4$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			switchMap((term: string) => {
				return this.catService.getSubCategories(this.categoryid, term).pipe(
					map( (response: {data: any[]}) => response.data ),
					map(x => {

						if (x.length === 0) {
							return [{id: 9, name: 'Altele'}];
						} else { return x; }
					})
				);
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
				return this.orgService.getorganisationbyName(term).pipe(
					map(elem => elem.data)
				);
		}));
	}
	selectedCounty(val: any) {
		this.form.controls.county.markAsTouched();
		if (val.item && val.item._id) {
			this.countyid = val.item._id;
			this.form.patchValue({county: val.item});
			this.form.controls.city.enable();
			this.cityPlaceholder = 'Alegeți Orașul';
		} else if (this.form.controls.county.value.name && val !== this.form.controls.county.value.name) {
			this.form.patchValue({county: '', city: ''});
		}
	}
	countykey(event: any) {
		this.form.controls.county.markAsTouched();
		if (event.code !== 'Enter') {
			this.form.controls.city.disable();
			this.form.controls.city.reset('');
			this.cityPlaceholder = 'Selectați mai întâi județul';
		}
	}
	categorykey(event: any) {
		this.form.controls.category.markAsTouched();
		if (event.code !== 'Enter') {
			this.form.controls.subCategory.disable();
			this.form.controls.subCategory.reset('');
			this.resourcePlaceholder = 'Selectați mai întâi categoria';
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
	selectedSubCategory(val: any) {
		this.form.controls.subCategory.markAsTouched();
		this.form.patchValue({subCategory: val.item});
	}
	selectedCategory(val: { item: any }) {
		this.form.controls.category.markAsTouched();
		if (val.item && val.item._id) {
			this.categoryid = val.item._id;
			this.form.patchValue({category: val.item});
			this.form.controls.subCategory.enable();
			this.resourcePlaceholder = 'Alegeți Resursa';
		} else if (this.form.controls.county.value.name && val !== this.form.controls.county.value.name) {
			this.form.patchValue({category: '', subCategory: ''});
		}
	}
	/**
	 * Send data from form to server. If success close page
	 */
	onSubmit() {
		const resource = this.form.value;
		resource.organisation_id = this.form.value.organisation._id;
		resource.county = resource.county._id;
		resource.city = resource.city._id;
		resource.category = [resource.category._id, resource.subCategory._id];
		if (this.edit) {
			this.resourcesService.editResource(this.res._id, resource)
			.subscribe((element: any) => {
				this.location.back();
			});
		}
		this.resourcesService
			.addResource(resource)
			.subscribe((element: any) => {
				this.location.back();
			});
	}

}
