import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { VolunteerService } from '../../../volunteers.service';
import { Router } from '@angular/router';
import { Observable, merge, Subject, of } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	map,
	filter,
	switchMap,
} from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { CitiesCountiesService } from '../../../../../core/service/cities-counties.service';
import { OrganisationService } from '../../../../organisations/organisations.service';
import { AuthenticationService } from '@app/core';
import { EmailValidation } from '@app/core/validators/email-validation';
import { PhoneValidation } from '@app/core/validators/phone-validation';

@Component({
	selector: 'app-add-volunteer',
	templateUrl: './add-volunteer.component.html',
	styleUrls: ['./add-volunteer.component.scss']
})

export class AddVolunteerComponent implements OnInit {
	form: FormGroup;
	orgDisabled = false;
	defaultOrgValue: {name: String, id: string};
	coursename: string;
	acreditedby: string;
	obtained: string;
	counties: String[] = [];
	cities: String[] = [];
	cityPlaceholder = 'Selectați mai întâi județul';
	@ViewChild('instance', { static: true }) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance1: NgbTypeahead;
	focus1$ = new Subject<string>();
	click1$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance2: NgbTypeahead;
	focus2$ = new Subject<string>();
	click2$ = new Subject<string>();
	currentUserId: string;

	constructor(
		public volunteerService: VolunteerService,
		private orgService: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		private citiesandCounties: CitiesCountiesService,
		private authService: AuthenticationService) {
		this.form = this.fb.group({
			name: ['', Validators.required],
			ssn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
			email: ['', [Validators.required, EmailValidation.emailValidation]],
			phone: ['', [Validators.required, PhoneValidation.phoneValidation]],
			address: [''],
			job: [''],
			county: ['', Validators.required],
			city: [{ value: '', disabled: true }, Validators.required],
			organisation_id: ['', Validators.required],
			courses: this.fb.array([]),
			comments: ['']
		});

		const navigation = this.router.getCurrentNavigation();
		if (navigation && navigation.extras && navigation.extras.state) {
			const ngo = navigation.extras.state.ngo;
			console.log(navigation.extras.state);
			if (ngo) {
				this.defaultOrgValue = ngo;
				this.form.patchValue({
					'organisation_id': ngo.ngoid
				});
			} else {
				const volunteer = navigation.extras.state.volunteer as any;
				if (volunteer) {
					this.defaultOrgValue = volunteer.organisation;
					this.form.controls.city.enable();
					this.form.patchValue(volunteer);
					this.form.patchValue({
						'organisation_id': volunteer.organisation._id
					});
				}
			}
		}
	}

	ngOnInit() {
		if (this.authService.role === '2') {this.orgDisabled = true; }
		this.counties = this.citiesandCounties.getCounties();
		this.authService.profile().subscribe((response) => {
			this.currentUserId = response._id;
		});
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
				return this.orgService.getorganisationbyName(term).pipe(
					map(elem => elem.data)
				);
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
		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);
		const clicksWithClosedPopup$ = this.click2$.pipe(
			filter(() => !this.instance2.isPopupOpen())
		);
		const inputFocus$ = this.focus2$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
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

	addCourse() {
		if (!(this.coursename === '' || this.acreditedby === '')) {
			this.c.push(
				this.fb.group({
					name: this.coursename,
					obtained: this.obtained,
					acreditedby: this.acreditedby
				})
			);
			this.coursename = null;
			this.acreditedby = null;
		}
	}

	removeCourse(index: number) {
		const control = <FormArray>this.form.controls.courses;

		// const objIndex = this.data.findIndex(((obj: any) => obj.key === 'courses'));
		// this.data[objIndex].value.splice(index, 1);
		control.removeAt(index);
	}

	selectedorganisation(val: any) {
		this.form.controls['organisation_id'].setValue(val.item._id);
	}

	selectedCounty(val: { item: string }) {
		this.citiesandCounties.getCitiesbyCounty(val.item).subscribe(k => {
			this.cities = k;
			this.form.controls.city.enable();
			this.cityPlaceholder = 'Alegeti Orasul';
		});
	}

	/**
	 * Send data from form to server. If success close page
	 */
	onSubmit() {
		const volunteer = this.form.value;
		volunteer.added_by = this.currentUserId;
		this.volunteerService.addVolunteer(volunteer).subscribe(() => {
			this.router.navigate(['organisations']);
		});
	}
}
