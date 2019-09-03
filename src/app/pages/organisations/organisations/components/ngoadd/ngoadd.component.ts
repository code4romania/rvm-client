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

@Component({
	selector: 'app-ngoadd',
	templateUrl: './ngoadd.component.html',
	styleUrls: ['./ngoadd.component.scss']
})

export class NgoaddComponent implements OnInit {
	form: FormGroup;
	cityPlaceholder = 'Selectați mai întâi județul';
	@ViewChild('instance', { static: true }) instance1: NgbTypeahead;
	focus1$ = new Subject<string>();
	click1$ = new Subject<string>();

	@ViewChild('instance', { static: true }) instance2: NgbTypeahead;
	focus2$ = new Subject<string>();
	click2$ = new Subject<string>();
	countyid = '';
	ngo: any;

	edit = false;
	loading = false;

	constructor(
		private route: ActivatedRoute,
		private organisationService: OrganisationService,
		private router: Router,
		private location: Location,
		private citiesandCounties: CitiesCountiesService,
		private fb: FormBuilder) { }

	ngOnInit() {
		this.getOrganisationDetails(this.route.snapshot.paramMap.get('id'));


		this.form = this.fb.group({
			name: ['', [Validators.required]],
			website: ['', [Validators.required, WebsiteValidation.websiteValidation]],
			contact_person: ['', Validators.required],
			phone: ['', [Validators.required, PhoneValidation.phoneValidation]],
			address: [''],
			cover: [''],
			email: ['', [Validators.required, EmailValidation.emailValidation]],
			county: ['', [Validators.required, LocationValidation.locationValidation]],
			city: [{value: '', disabled: true }, [Validators.required, LocationValidation.locationValidation]],
			comments: ['']
		});
	}

	formatter = (result: { name: string }) => result.name;

	getOrganisationDetails(ngoId: string) {
		if (ngoId) {
			this.edit = true;
			this.organisationService.getorganisation(ngoId).subscribe(data => {
				this.ngo = data;
				this.countyid = data.county._id;
				this.form = this.fb.group({
					name: [this.ngo.name ],
					cover: [this.ngo.cover],
					website: [this.ngo.website, [Validators.required, WebsiteValidation.websiteValidation]],
					contact_person: [this.ngo.contact_person, Validators.required],
					phone: [this.ngo.phone, [Validators.required, PhoneValidation.phoneValidation]],
					address: [this.ngo.address],
					email: [this.ngo.email, [Validators.required, EmailValidation.emailValidation]],
					county: [this.ngo.county, [Validators.required, LocationValidation.locationValidation]],
					city: [this.ngo.city, [Validators.required, LocationValidation.locationValidation]],
					comments: [this.ngo.comments]
				});
			});
		}
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
			debounceTime(500),
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

	selectedCity(val: { item: any }) {
		this.form.controls.city.markAsTouched();
		this.form.patchValue({city: val.item});
	}

	/**
	 * Send data from form to server. If success close page
	 */
	onSubmit() {
		this.loading = true;
		const ngo = this.form.value;
		ngo.city = ngo.city._id;
		ngo.county = ngo.county._id;
		if (this.ngo) {
			this.organisationService.editOrganisation(this.ngo._id, this.form.value).subscribe(() => {
				this.loading = false;
				this.location.back();
			}, () => {
				this.loading = false;
			});
		} else {
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
}
