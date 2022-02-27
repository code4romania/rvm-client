import { Component, OnInit, ViewChild } from '@angular/core';
import {
	FormGroup,
	Validators,
	FormBuilder
} from '@angular/forms';
import { OrganisationService } from '../../../organisations.service';
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
import { EmailValidation } from '@app/core/validators/email-validation';
import { PhoneValidation } from '@app/core/validators/phone-validation';
import { WebsiteValidation } from '@app/core/validators/website-validation';
import { Location } from '@angular/common';
import { LocationValidation } from '@app/core/validators/location-validation';
import { UtilService } from '@app/core';

@Component({
	selector: 'app-organisation-add',
	templateUrl: './organisation-add.component.html',
	styleUrls: ['./organisation-add.component.scss']
})

export class OrganisationaddComponent implements OnInit {
	/**
	* form that holds data
	*/
	form: FormGroup;

	/**
	* placeholder for disabled city field
	*/
	cityPlaceholder = 'Selectați mai întâi județul';

	/**
	* references to NGBTypeahead for opening on focus or click
	*/
	@ViewChild('instance', { static: true }) instance1: NgbTypeahead;
	focus1$ = new Subject<string>();
	click1$ = new Subject<string>();

	@ViewChild('instance', { static: true }) instance2: NgbTypeahead;
	focus2$ = new Subject<string>();
	click2$ = new Subject<string>();
	/**
	 * flag for HTML to display loading animation
	 */
	loading = false;
	loadingCities = false;
	/**
	* list of cities to pe parsed. edited when the user selects a county or edits this NGO
	*/
	cities: any[] = [];

	constructor(
		private route: ActivatedRoute,
		private organisationService: OrganisationService,
		private utilService: UtilService,
		private location: Location,
		private citiesandCounties: CitiesCountiesService,
		private fb: FormBuilder) { }

	ngOnInit() {
		/**
		* init form with empty values
		*/
		this.form = this.fb.group({
			name: ['', [Validators.required]],
			website: ['', [Validators.required, WebsiteValidation.websiteValidation]],
			contact_person: ['', Validators.required],
			phone: ['', [Validators.required, PhoneValidation.phoneValidation]],
			address: [''],
			cover: [''],
			email: ['', [Validators.required, EmailValidation.emailValidation]],
			county: ['', [Validators.required, LocationValidation.locationValidation]],
			city: [{ value: '', disabled: true }, [Validators.required, ]],
			comments: ['']
		});
	}

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
	 * trigger for city typeahead. registers typing, focus, and click and searches the stored list of cities
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
				this.cityPlaceholder = 'Alegeți Orașul';
				this.loadingCities = false;
				this.form.controls.city.enable();
			});
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
	 * Process form values and send data to server. If success close page
	 */
	onSubmit() {
		this.loading = true;
		const ngo = this.form.value;
		ngo.city = ngo.city._id;
		ngo.county = ngo.county._id;
		this.organisationService
			.addorganisation(ngo)
			.subscribe(() => {
				this.loading = false;
				this.location.back();
			}, () => {
				this.loading = false;
			});
	}
}
