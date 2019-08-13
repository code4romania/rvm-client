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
import { OrganizationService } from '../../../../organizations/organizations.service';
import { AuthenticationService } from '@app/core';

@Component({
	selector: 'app-add-volunteer',
	templateUrl: './add-volunteer.component.html',
	styleUrls: ['./add-volunteer.component.scss']
})

export class AddVolunteerComponent implements OnInit {
	searching = false;
	searchFailed = false;
	form: FormGroup;
	orgDisabled = false;
	defaultOrgValue = '';
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
		private orgService: OrganizationService,
		private router: Router,
		private fb: FormBuilder,
		private citiesandCounties: CitiesCountiesService,
		private authService: AuthenticationService) { }

	ngOnInit() {
		this.counties = this.citiesandCounties.getCounties();
		this.form = this.fb.group({
			name: ['', Validators.required],
			ssn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
			address: [''],
			job: [''],
			county: ['', Validators.required],
			city: [{ value: '', disabled: true }, Validators.required],
			organization_id: ['', Validators.required],
			courses: this.fb.array([]),
			comments: ['']
		});

		const navigation = this.router.getCurrentNavigation();

		if (navigation && navigation.extras && navigation.extras.state) {
			const ngo = navigation.extras.state.ngo;

			if (ngo) {
				this.orgDisabled = true;
				this.defaultOrgValue = ngo.name;
				this.form.patchValue({
					'organization_id': ngo.ngoid
				});
			} else {
				const volunteer = navigation.extras.state.volunteer as { name: string, ssn: string, email: string,
																phone: string, address: string, job: string, county: string,
																city: string, organisation: any, courses: any[], comments: string };
				if (volunteer) {
					this.defaultOrgValue = volunteer.organisation.name;
					this.form.controls.city.enable();
					this.form.patchValue(volunteer);
					this.form.patchValue({
						'organization_id': volunteer.organisation._id
					});
				}
			}
		}

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

	searchorganization = (text$: Observable<string>) => {
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
				return this.orgService.getOrganizationbyName(term).pipe(
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

	selectedOrganization(val: any) {
		this.form.controls['organization_id'].setValue(val.item._id);
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
			this.router.navigate(['organizations']);
		});
	}
}
