import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
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
	tap,
	catchError
} from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { CitiesCountiesService } from '../../../../../core/service/cities-counties.service';
import { OrganizationService } from '../../../../organizations/organizations.service';
import { NgPlural } from '@angular/common';

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
	constructor(
		public volunteerService: VolunteerService,
		private orgService: OrganizationService,
		private router: Router,
		private fb: FormBuilder,
		private citiesandCounties: CitiesCountiesService,
	) {
		this.counties = citiesandCounties.getCounties();
		this.form = this.fb.group({
			name: ['', Validators.required],
			ssn: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required],
			address: ['', Validators.required],
			job: ['', Validators.required],
			county: ['', Validators.required],
			city: [{ value: '', disabled: true }, Validators.required],
			organization_id: ['', Validators.required],
			courses: this.fb.array([]),
			comments: ['', Validators.required]
		});
		const navigation = this.router.getCurrentNavigation();
		const ngo = navigation.extras.state as { ngoid: string, name: string };
		if (ngo) {
			// if
			console.log(ngo);
			this.defaultOrgValue = ngo.name;
			this.form.patchValue({
				'organization_id': ngo.ngoid
			});
		}
	}
	ngOnInit() {}
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
				if (term === '') {
					return this.orgService.getOrganizations().pipe();
				} else {
					return this.orgService.getOrganizationbyName(term).pipe();
				}
			})
		);
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
		console.log(val.item);
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
		console.log('form:', this.form.value);
		// this.volunteerService.addVolunteer(this.form.value).subscribe((element: any) => {
		// 	console.log(element);
		// 	this.navigateToDashboard();
		// });
	}
	navigateToDashboard() {
		this.router.navigate(['organizations']);
	}
}
