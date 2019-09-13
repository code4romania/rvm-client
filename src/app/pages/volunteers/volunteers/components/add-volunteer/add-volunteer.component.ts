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

	/**
	* flag -> if user is editing then method is PUT, else POST
	*/
	edit = false;
	/**
	* flag -> if information is beeing loaded show loader elements in frontend
	*/
	loading = false;
	loadingCities = false;
	/**
	* list of cities to pe parsed. edited when the user selects a county or edits this NGO
	*/
	cities: any[] = [];
	/**
	* date object to force course acreditation date in the past
	*/
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
		if (this.route.snapshot.paramMap.get('id')) {
			this.getVolunteerDetails(this.route.snapshot.paramMap.get('id'));
		}
	}

	getVolunteerDetails(volId: string) {
		if (volId) {
			this.edit = true;
			this.volunteerService.getVolunteer(volId).subscribe(data => {
				const aux = data.courses.map((element: any) => {
					return this.fb.group({
						course_name: element.course_name.name,
						course_name_id: element.course_name._id,
						obtained: moment(element.obtained).format('DD.MM.YYYY'),
						accredited_by: element.accredited.name
					});
				});
				this.form = this.fb.group({
					name: [data.name, Validators.required],
					ssn: [data.ssn, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
					email: [data.email, [Validators.required, EmailValidation.emailValidation]],
					phone: [data.phone, [Validators.required, PhoneValidation.phoneValidation]],
					address: data.address,
					job: data.job,
					courses:  this.fb.array(aux),
					county: ['', Validators.required],
					city: ['', Validators.required],
					organisation: [{value: data.organisation, disabled: this.authService.is('NGO') }, Validators.required],
					comments: data.comments
				});
				console.log(this.form);
				this.selectedCounty({item: data.county});
				this.selectedCity({item: data.city});
			});
		}
	}

	get f() {
		return this.form.controls;
	}

	get c() {
		return this.f.courses as FormArray;
	}

	formatter = (result: { name: string }) => result.name;

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
				return this.filterService.getSpecializationFilters(term);
			}));
	}

	searchacreditedby = (text$: Observable<string>) => {
		// return text$.pipe(switchMap((term: string) => []));
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
				return this.filterService.getAcreditedFilters(term);
			}));
	}

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
	courseKey(event: any) {
		if (event.code !== 'Enter') {
			this.coursenameError = true;
		}
	}
	selectedcourse() {
		this.coursenameError = false;
	}
	addCourse() {
		const now = new Date();
		if (!this.acreditedby) {
			this.accreditedError = true;
		}
		if (!this.obtained) {
			this.dateError = true;
		}
		if (this.obtained < now) {
			if (!this.coursenameError && this.coursename && this.acreditedby) {
				this.c.push(
					this.fb.group({
						course_name: this.coursename.name,
						course_name_id: this.coursename._id,
						obtained: moment(this.obtained).format('DD.MM.YYYY'),
						accredited_by: this.acreditedby.hasOwnProperty('name') ? this.acreditedby.name : this.acreditedby
					})
				);
				this.accreditedError = false;
				this.coursename = null;
				this.acreditedby = null;
				this.obtained = null;
				this.dateError = false;
			}
		} else {
			this.dateError = true;
		}
	}

	removeCourse(index: number) {
		const control = <FormArray>this.form.controls.courses;
		control.removeAt(index);
	}
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
	countykey(event: any) {
		this.form.controls.county.markAsTouched();
		if (event.code !== 'Enter') {
			this.form.controls.city.disable();
			this.form.controls.city.reset('');
			this.cityPlaceholder = 'Selectați mai întâi județul';
		}
	}
	selectedCity(val: { item: any }) {
		this.form.controls.city.markAsTouched();
		this.form.patchValue({city: val.item});
	}

	selectedorganisation(val: { item: any }) {
		this.form.controls.organisation.markAsTouched();
		this.form.patchValue({organisation: val.item});
	}

	onSubmit() {
		this.loading = true;
		const volunteer = {...this.form.value};
		volunteer.ssn = volunteer.ssn.toString();
		volunteer.county = volunteer.county._id;
		volunteer.city = volunteer.city._id;
		volunteer.organisation_id = this.form.controls.organisation.value._id;
		if (this.edit) {
			this.volunteerService.editVolunteer(this.route.snapshot.paramMap.get('id'), volunteer).subscribe(() => {
				this.loading = false;
				this.location.back();
			}, () => {
				this.loading = false;
			});
		} else {
			this.volunteerService.addVolunteer(volunteer).subscribe(() => {
				this.loading = false;
				this.form.controls['email'].setErrors({});
				this.location.back();
			}, () => {
				this.loading = false;
				this.form.controls['email'].setErrors({'email': 'Adresa de email introdusă există deja în sistem.'});
			});
		}
	}
}
