import { Component, OnInit, ViewChild } from '@angular/core';
import {
	FormGroup,
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
import { AuthenticationService, FiltersService, UtilService } from '@app/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-add-resource',
	templateUrl: './add-resource.component.html',
	styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
	/**
	* form that holds data
	*/
	form: FormGroup;
	/**
	* flag -> if user is editing then method is PUT, else POST
	*/
	edit = false;
	res: any;
	/**
	*  list of items to select from.
	*/
	cities: any[] = [];
	categories: any[] = [];
	subCategories: any[] = [];
	/**
	* flag -> if information is beeing loaded show loader elements in frontend
	*/
	loading = false;
	loadingCities = false;

	/**
	* placeholders for HTML
	*/
	cityPlaceholder = 'Selectați mai întâi județul';
	resourcePlaceholder = 'Selectați mai întâi categoria';

	/**
	* references to NGBTypeahead for opening on focus or click
	*/
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
		private route: ActivatedRoute,
		private location: Location, private router: Router,
		private citiesandCounties: CitiesCountiesService,
		private fb: FormBuilder, private utilService: UtilService,
		private filterService: FiltersService,
		public authService: AuthenticationService) { }

	ngOnInit() {

		const navigation = this.router.getCurrentNavigation();
		let fixedOrg: any = null;
		this.filterService.getSubCategories('0', '').subscribe((elem: any) => {
			this.categories = elem;
		});
		if (navigation && navigation.extras && navigation.extras.state) {
			fixedOrg = navigation.extras.state.ngo;
		}

		this.form = this.fb.group({
			subCategory: [{ value: '', disabled: true }],
			name: ['', Validators.required],
			address: '',
			resource_type: ['', Validators.required],
			category: ['', Validators.required],
			organisation: this.authService.is('NGO') ?
				[{
					value: { name: this.authService.user.organisation.name, _id: this.authService.user.organisation._id },
					disabled: true
				}, Validators.required]
				: fixedOrg ?
					[{
						value: { name: fixedOrg.name, _id: fixedOrg._id },
						disabled: false
					}, Validators.required]
					: [{ value: '', disabled: false }, Validators.required],
			quantity: ['', [Validators.required, Validators.min(1)]],
			city: [{ value: '', disabled: true }, Validators.required],
			county: ['', Validators.required],
			comments: ''
		});
	}
	/**
		 * formater to display only name from object
		 */
	formatter = (result: { name: string }) => result.name;
	/**
	 * trigger for county typeahead. registers typing, focus, and click and searches the backend
	 * @param {Observable} text observable event with the filter text
	 */
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
	/**
		 * trigger for county typeahead. registers typing, focus, and click and searches the backend
		 * @param {Observable} text observable event with the filter text
		 */
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
	/**
	 * trigger for organisation typeahead. registers typing, focus, and click and searches the backend
	 * @param {Observable} text observable event with the filter text
	 */
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
	/**
		 * trigger for select county from county typeahead. will unlock the city field
		 * @param {any} val result object from typeahead that needs to be stored
		 */
	selectedCounty(val: any) {
		this.form.controls.county.markAsTouched();
		if (val.item && val.item._id) {
			this.form.patchValue({ county: val.item });
			this.loadingCities = true;
			this.citiesandCounties.getCitiesbyCounty(val.item._id, '').subscribe((res: any) => {
				this.cities = res;
				this.loadingCities = false;
				this.form.controls.city.enable();
			});
			this.cityPlaceholder = 'Alegeți Orașul';
		} else if (this.form.controls.county.value.name && val !== this.form.controls.county.value.name) {
			this.form.patchValue({ county: '', city: '' });
		}
	}
	/**
		 * trigger for editing the county field. When activated, disable the city form until enter is pressed or mouse selection
		 * @param {any} event to be verified for which key has been pressed
		*/
	countykey(event: any) {
		this.form.controls.county.markAsTouched();
		if (event.code !== 'Enter') {
			this.cities = [];
			this.form.controls.city.disable();
			this.form.controls.city.reset('');
			this.cityPlaceholder = 'Selectați mai întâi județul';
		}
	}
	/**
		 * trigger for select city from city typeahead
		 * @param {any} val result object from typeahead that needs to be stored
		 */
	selectedCity(val: { item: any }) {
		this.form.controls.city.markAsTouched();
		this.form.patchValue({ city: val.item });
	}
	/**
	 * trigger for select organisation from organisation typeahead.
	 * @param {any} val result object from typeahead that needs to be stored
	 */
	selectedOrganisation(val: any) {
		this.form.controls.organisation.markAsTouched();
		if (val.item && val.item._id) {
			this.form.patchValue({ organisation: val.item });
		} else if (this.form.controls.organisation.value.name && val !== this.form.controls.organisation.value.name) {
			this.form.patchValue({ organisation: '' });
		}
	}
	/**
	 * trigger for select category from category typeahead. will unlock the subcategory field
	 */
	selectedCategory() {
		this.form.controls.category.markAsTouched();
		if (this.form.value.category) {
			this.filterService.getSubCategories(this.form.value.category, '').subscribe(resp => {
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

	onSubmitValidation() {
		// TODO: Consider if is there a need for generic custom validation on submission
		const validators = [
			{
				input: 'organisation',
				rule: (value: any) => {
					return value._id !== undefined;
				}
			},
			{
				input: 'city',
				rule: (value: any) => {
					return value._id !== undefined;
				}
			}
		];

		const results = validators.map(item => {
			return {
				input: item.input,
				valid: item.rule(this.form.controls[item.input].value)
			};
		});

		results.forEach(result => {
			if (!result.valid) {
				this.form.controls[result.input].setErrors({error: 'Error'});
			}
		});
	}
	/**
	 * Process form values and send data to server. If success close page
	 */
	onSubmit() {
		this.onSubmitValidation();
		this.loading = true;
		const resource = this.form.value;
		resource.organisation_id = this.form.controls['organisation'].value._id;
		resource.county = resource.county._id;
		resource.city = resource.city._id;
		resource.categories = [resource.category];
		if (resource.subCategory) {
			resource.categories.push(resource.subCategory);
		}
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
