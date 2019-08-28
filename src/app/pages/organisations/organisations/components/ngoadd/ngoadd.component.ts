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
	map
} from 'rxjs/operators';
import { merge } from 'rxjs';
import { EmailValidation } from '@app/core/validators/email-validation';
import { PhoneValidation } from '@app/core/validators/phone-validation';
import { WebsiteValidation } from '@app/core/validators/website-validation';
import { Location } from '@angular/common';

@Component({
	selector: 'app-ngoadd',
	templateUrl: './ngoadd.component.html',
	styleUrls: ['./ngoadd.component.scss']
})

export class NgoaddComponent implements OnInit {
	form: FormGroup;
	data: any;
	cityPlaceholder = 'Selectați mai întâi județul';
	@ViewChild('instance', { static: true }) instance1: NgbTypeahead;
	focus1$ = new Subject<string>();
	click1$ = new Subject<string>();

	@ViewChild('instance', { static: true }) instance2: NgbTypeahead;
	focus2$ = new Subject<string>();
	click2$ = new Subject<string>();

	counties: string[] = [];
	cities: string[] = [];

	ngo: any;
	edit = false;

	constructor(
		private route: ActivatedRoute,
		private organisationService: OrganisationService,
		private router: Router, private location: Location,
		private citiesandCounties: CitiesCountiesService,
		private fb: FormBuilder) { }

	ngOnInit() {
		this.getOrganisationDetails(this.route.snapshot.paramMap.get('id'));

		this.citiesandCounties.getCounties().subscribe((response: any[]) => {
			this.counties = response;
		});

		this.form = this.fb.group({
			name: ['', [Validators.required]],
			website: ['', [Validators.required, WebsiteValidation.websiteValidation]],
			contact_person: ['', Validators.required],
			phone: ['', [Validators.required, PhoneValidation.phoneValidation]],
			address: [''],
			email: ['', [Validators.required, EmailValidation.emailValidation]],
			county: ['', Validators.required],
			city: [{ value: '', disabled: true }, Validators.required],
			comments: ['']
		});
	}

	formatter = (result: { name: string }) => result.name;

	getOrganisationDetails(ngoId: string) {
		if (ngoId) {
			this.edit = true;
			this.organisationService.getorganisation(ngoId).subscribe(data => {
				this.ngo = data;

				this.form = this.fb.group({
					name: [this.ngo.name, ],
					website: [this.ngo.website, [Validators.required, WebsiteValidation.websiteValidation]],
					contact_person: [this.ngo.contact_person, Validators.required],
					phone: [this.ngo.phone, [Validators.required, PhoneValidation.phoneValidation]],
					address: [this.ngo.address],
					email: [this.ngo.email, [Validators.required, EmailValidation.emailValidation]],
					county: [this.ngo.county, Validators.required],
					city: [{ value: this.ngo.city, disabled: true }, Validators.required],
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
			map((term: string) =>
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

	selectedCounty(val: { item: any }) {
		this.citiesandCounties.getCitiesbyCounty(val.item.name).subscribe(k => {
			this.cities = k;
			this.form.controls.city.enable();
			this.cityPlaceholder = 'Alegeți Orașul';
		});
	}

	/**
	 * Send data from form to server. If success close page
	 */
	onSubmit() {
		const ngo = this.form.value;
		ngo.city = ngo.city.id;
		ngo.county = ngo.county.id;
		if (this.ngo) {
			this.organisationService.editOrganisation(this.ngo._id, this.form.value).subscribe(() => {
				this.location.back();
			});
		} else {
			this.organisationService
			.addorganisation(ngo)
			.subscribe(() => {
				this.location.back();
			});
		}
	}
}
