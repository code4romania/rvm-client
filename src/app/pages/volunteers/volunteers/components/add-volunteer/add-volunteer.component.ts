import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { VolunteerService } from '../../../volunteers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, merge, Subject } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	map,
	filter,
	switchMap,
} from 'rxjs/operators';
import { NgbTypeahead, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { CitiesCountiesService } from '../../../../../core/service/cities-counties.service';
import { AuthenticationService, FiltersService, UtilService } from '@app/core';
import { EmailValidation } from '@app/core/validators/email-validation';
import { PhoneValidation } from '@app/core/validators/phone-validation';
import { Location } from '@angular/common';
import { SsnValidation } from '@app/core/validators/ssn-validation';
import * as moment from 'moment';
import { TouchSequence } from 'selenium-webdriver';

@Component({
	selector: 'app-add-volunteer',
	templateUrl: './add-volunteer.component.html',
	styleUrls: ['./add-volunteer.component.scss'],
	providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})

export class AddVolunteerComponent implements OnInit {
	/**
	* form that holds data
	*/
	form: FormGroup;
	/**
	* courses values and errors
	*/
	coursename: any;
	coursenameError = false;
	acreditedby: any;
	accreditedError = false;
	obtained: Date;
	dateError = false;

/**
	* placeholder for disabled city field
	*/
	cityPlaceholder = 'Selectați mai întâi județul';
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
	static_accreditor = false;
	/**
	* flag -> if information is beeing loaded show loader elements in frontend
	*/
	loading = false;
	loadingCities = false;
	/**
	* list of cities to pe parsed. edited when the user selects a county or edits this NGO
	*/
	cities: any[] = [];
	// /**
	// * date object to force course acreditation date in the past
	// */
	now: any;

	constructor(
		public volunteerService: VolunteerService,
		private filterService: FiltersService,
		private router: Router, private utilService: UtilService,
		private route: ActivatedRoute, private location: Location,
		private fb: FormBuilder,
		private citiesandCounties: CitiesCountiesService,
		public authService: AuthenticationService) {
			const dateObj = new Date();
			const month = dateObj.getUTCMonth() + 1; // months from 1-12
			const day = dateObj.getUTCDate();
			const year = dateObj.getUTCFullYear();
			this.now = {day: day, month: month, year: year};
		}

	ngOnInit() {
		const navigation = this.router.getCurrentNavigation();

		let fixedOrg: any;
		if (navigation && navigation.extras && navigation.extras.state) {
			fixedOrg = navigation.extras.state.ngo;
		}
		this.form = this.fb.group({
			name: ['', Validators.required],
			ssn: ['', [Validators.required, SsnValidation.ssnValidation]],
			email: ['', [Validators.required, EmailValidation.emailValidation]],
			phone: ['', [Validators.required, PhoneValidation.phoneValidation]],
			address: [''],
			job: [''],
			county: ['', Validators.required],
			city: [{ value: '', disabled: true }, Validators.required],
			organisation: this.authService.is('NGO') ?
								[{value: {name: this.authService.user.organisation.name, _id: this.authService.user.organisation._id},
									disabled: true }, Validators.required]
								:	fixedOrg ?
									[{value: {name: fixedOrg.name, _id: fixedOrg._id},
										disabled: false }, Validators.required]
										:	[{value: '' , disabled: false }, Validators.required],
			courses: this.fb.array([]),
			comments: ['']
		});
	}
	/**
	 * wrapper for the form' controls
	 */
	get f() {
		return this.form.controls;
	}
/**
	 * wrapper for the form's controls courses array
	 */
	get c() {
		return this.f.courses as FormArray;
	}
/**
	 * formater to display only name from object
	 */
	formatter = (result: { name: string }) => result.name ? result.name : result;
	/**
	* trigger for organistion typeahead. registers typing, focus, and click and searches the backend
	* @param {Observable} text observable event with the filter text
	*/
	searchorganisation = (text$: Observable<string>) => {
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
	* trigger for course typeahead. registers typing, focus, and click and searches the backend
	* @param {Observable} text observable event with the filter text
	*/
	searchcourse = (text$: Observable<string>) => {
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
				this.coursenameError = false;
				return this.filterService.getSpecializationFilters(term);
			}));
	}
	/**
	* trigger for accredited by typeahead. registers typing, focus, and click and searches the backend
	* @param {Observable} text observable event with the filter text
	*/
	searchacreditedby = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);

		const clicksWithClosedPopup$ = this.click4$.pipe(
			filter(() => !this.instance.isPopupOpen())
		);

		const inputFocus$ = this.focus4$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			switchMap((term: string) => {
				this.accreditedError = false;
				return this.filterService.getAcreditedFilters(term);
			}));
	}
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
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
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
	 * trigger for editing the county field. When activated, disable the static acreditor
	 * @param {any} event to be verified for which key has been pressed
	*/
	courseKey(event: any) {
		if (event.code !== 'Enter') {
			this.coursenameError = true;
			this.static_accreditor = false;
			this.resetAccreditedByField();
		}
	}
	/**
	 * if error has appeared, when user changes input remove the error
	 */
	acreditorKey() {
		this.accreditedError = false;
	}
/**
	 * trigger for select course from course typeahead
	 * @param {any} val result object from typeahead that needs to be stored
	 */
	selectedcourse(obj: any) {
		if (obj.item.static_accreditor) {
			this.acreditedby = obj.item.static_accreditor;
			this.static_accreditor = true;
		} else {
			this.resetAccreditedByField();
			this.static_accreditor = false;
		}
		this.coursenameError = false;
	}

	resetAccreditedByField() {
		this.acreditedby = '';
	}

	resetCourseForm() {
		this.static_accreditor = false;
		this.coursename = null;
		this.obtained = null;
		this.dateError = false;
		this.accreditedError = false;
		this.coursenameError = false;
		this.resetAccreditedByField();
	}
/**
	 * trigger for add course from course table footer. willbe added to form and displayed in table
	 */
	addCourse() {
		if (!this.coursename) {
			this.coursenameError = true;
		}
		if (!this.obtained) {
			this.dateError = true;
		}
		if (!this.coursenameError && this.coursename) {
			this.c.push(
				this.fb.group({
					course_name: this.coursename.name,
					course_name_id: this.coursename._id,
					obtained: moment(this.obtained).format('DD.MM.YYYY'),
					accredited_by: this.acreditedby.hasOwnProperty('name') ? this.acreditedby.name : this.acreditedby
				})
			);
			this.resetCourseForm();
		}
	}
	/**
	* remove one of the courses from the table by index
	* @param {number} index result object from typeahead that needs to be stored
	*/
	removeCourse(index: number) {
		const control = <FormArray>this.form.controls.courses;
		control.removeAt(index);
	}
	/**
	 * trigger for select county from county typeahead. will unlock the city field
	 * @param {any} val result object from typeahead that needs to be stored
	 */
	selectedCounty(val: any) {
		this.form.controls.county.markAsTouched();
		if (val.item && val.item._id) {

			this.form.patchValue({county: val.item});
			this.loadingCities = true;
			this.citiesandCounties.getCitiesbyCounty(val.item._id, '').subscribe((res: any) => {
				this.cities = res;
				this.loadingCities = false;
				this.form.controls.city.enable();
			});
			this.cityPlaceholder = 'Alegeți Orașul';
		} else if (this.form.controls.county.value.name && val !== this.form.controls.county.value.name) {
			this.form.patchValue({county: '', city: ''});
		}
	}
/**
	 * trigger for editing the county field. When activated, disable the city form until enter is pressed or mouse selection
	 * @param {any} event to be verified for which key has been pressed
	*/
	countykey(event: any) {
		this.form.controls.county.markAsTouched();
		if (event.code !== 'Enter') {
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
		this.form.patchValue({city: val.item});
	}
	/**
	* trigger for select organisation from organisation typeahead.
	* @param {any} val result object from typeahead that needs to be stored
	*/
	selectedorganisation(val: { item: any }) {
		this.form.controls.organisation.markAsTouched();
		this.form.patchValue({organisation: val.item});
	}
/**
	 * Process form values and send data to server. If success close page
	 */
	onSubmit() {
		this.loading = true;
		const volunteer = {...this.form.value};
		volunteer.ssn = volunteer.ssn.toString();
		volunteer.county = volunteer.county._id;
		volunteer.city = volunteer.city._id;
		volunteer.organisation_id = this.form.controls.organisation.value._id;
		this.volunteerService.addVolunteer(volunteer).subscribe(() => {
			this.loading = false;
			this.form.controls['email'].setErrors({});
			this.location.back();
		}, (obj: any) => {
			this.loading = false;
			if (obj.error.errors) {
				if (obj.error.errors[0].indexOf('CNP') !== -1) {
					this.form.controls['ssn'].setErrors({'ssn': 'CNP-ul introdus există deja în sistem.'});
				} else {
					this.form.controls['email'].setErrors({'email': 'Adresa de email introdusă există deja în sistem.'});
				}
			}
		});
	}
}
