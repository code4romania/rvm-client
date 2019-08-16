import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
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
import { AuthenticationService } from '@app/core';

@Component({
	selector: 'app-add-resource',
	templateUrl: './add-resource.component.html',
	styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
	form: FormGroup;
	orgDisabled = false;
	defaultOrgValue: {name: String, id: string};
	counties: String[] = [];
	cities: String[] = [];
	cityPlaceholder = 'Selectați mai întâi județul';
	resourcePlaceholder = 'Selectați mai întâi categoria';
	currentUserId: string;
	@ViewChild('instance', { static: true }) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance1: NgbTypeahead;
	focus1$ = new Subject<string>();
	click1$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance2: NgbTypeahead;
	focus2$ = new Subject<string>();
	click2$ = new Subject<string>();
	constructor(private resourcesService: ResourcesService,
		private router: Router,
		private citiesandCounties: CitiesCountiesService,
		private fb: FormBuilder,
		private orgService: OrganisationService,
		private authService: AuthenticationService) {
		this.form = this.fb.group({
			type_name: ['', Validators.required],
			subcat: [/*{ value: '', disabled: true }*/'', Validators.required],
			name: '',
			address: '',
			organisation_id: '',
			quantity: ['', Validators.required],
			city: [{ value: '', disabled: true }, Validators.required],
			county: ['', Validators.required],
			comments: ''
		});
		const navigation = this.router.getCurrentNavigation();
		if (navigation && navigation.extras && navigation.extras.state) {
			const ngo = navigation.extras.state.ngo;
			if (ngo) {
				this.defaultOrgValue = ngo;
				this.form.patchValue({
					'organisation_id': ngo.ngoid
				});
			} else {
				const resource = navigation.extras.state.resource as any;
				if (resource) {
					this.defaultOrgValue = resource.organisation;
					this.form.controls.city.enable();
					this.form.patchValue(resource);
					this.form.patchValue({
						'organisation_id': resource.organisation._id
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
	searchorganisation = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);
		const clicksWithClosedPopup$ = this.click$.pipe(
			filter(() => !this.instance.isPopupOpen())
		);
		const inputFocus$ = this.focus$;
		// return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
		// 	switchMap((term: string) => {
		// 		if (term === '') {
		// 			return this.orgService.getorganisations().pipe();
		// 		} else {
		// 			return this.orgService.getorganisationbyName(term).pipe();
		// 		}
		// 	})
		// );
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			switchMap((term: string) => {
				return this.orgService.getorganisationbyName(term).pipe(
					map(elem => elem.data)
				);
		}));
	}
	selectedCounty(val: { item: string }) {
		this.citiesandCounties.getCitiesbyCounty(val.item).subscribe(k => {
			this.cities = k;
			this.form.controls.city.enable();
			this.cityPlaceholder = 'Alegeti Orasul';
		});
	}
	// selectedorganisation() {
	// 	this.form.controls['organisation_id'].setValue(this.defaultOrgValue.id);
	// }
	selectedorganisation(val: any) {
		this.form.controls['organisation_id'].setValue(val.item._id);
	}

	/**
	 * Send data from form to server. If success close page
	 */
	onSubmit() {
		this.resourcesService
			.addResource(this.form.value)
			.subscribe((element: any) => {
				console.log(element);
				this.navigateToDashboard();
			});
	}
	navigateToDashboard() {
		this.router.navigate(['resources']);
	}
	selectedCategory(val: { item: string }) {
		// this.citiesandCounties.getCitiesbyCounty(val.item).subscribe(k => {
			// this.cities = k;
			this.form.controls.subcat.enable();
			this.resourcePlaceholder = 'Alegeti Resursa';
		// });
	}
}
