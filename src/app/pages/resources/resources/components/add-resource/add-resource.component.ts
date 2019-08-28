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
import { AuthenticationService, CategoriesService } from '@app/core';
import { Location, isPlatformWorkerApp } from '@angular/common';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';

@Component({
	selector: 'app-add-resource',
	templateUrl: './add-resource.component.html',
	styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
	form: FormGroup;
	orgDisabled = false;
	defaultOrgValue: {name: String, id: string};
	counties: any[] = [];
	cities: any[] = [];
	defaultCategory: any;
	defaultSubcat: any;
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
	@ViewChild('instance', { static: true }) instance3: NgbTypeahead;
	focus3$ = new Subject<string>();
	click3$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance4: NgbTypeahead;
	focus4$ = new Subject<string>();
	click4$ = new Subject<string>();
	constructor(private resourcesService: ResourcesService,
		private router: Router, private catService: CategoriesService,
		private location: Location,
		private citiesandCounties: CitiesCountiesService,
		private fb: FormBuilder,
		private orgService: OrganisationService,
		public authService: AuthenticationService) {

		this.form = this.fb.group({
			type_name: ['', Validators.required],
			subcat: ['', Validators.required],
			name: ['', Validators.required],
			address: '',
			category: '',
			organisation_id: '',
			quantity: ['', [Validators.required, Validators.min(0)]],
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
		if (this.authService.accessLevel === '2') {
			this.orgDisabled = true;
		}

		this.citiesandCounties.getCounties().subscribe((response: any[]) => {
			this.counties = response;
		});

		this.currentUserId = this.authService.user._id;
	}

	formatter = (result: { name: string }) => result.name;

	searchCounty = (text$: Observable<string>) => {
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
	searchCategory = (text$: Observable<string>) => {
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
				return this.catService.getCategories(term).pipe(
					map(x => {
						if (x.length === 0) {
							return [{id: 9, name: 'Altele'}];
						} else { return x; }
					})
				);
		}));
	}
	searchSubcat = (text$: Observable<string>) => {
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
				if (term !== '') {
					return this.catService.getSubCategories(1, term).pipe(
						map(x => {
							if (x.length === 0) {
								return [{id: 9, name: 'Altele'}];
							} else { return x; }
						})
					);
				} else {
					return [];
				}
		}));
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
								v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
					)
				).slice(0, 10)
			)
		);
	}

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
				return this.orgService.getorganisationbyName(term).pipe(
					map(elem => elem.data)
				);
		}));
	}

	selectedCounty(val: { item: any }) {
		this.citiesandCounties.getCitiesbyCounty(val.item.name).subscribe(response => {
			this.cities = response;
			this.form.controls.city.enable();
			this.cityPlaceholder = 'Alegeți Orașul';
		});
	}

	selectedOrganisation(val: any) {
		this.form.controls['organisation_id'].setValue(val.item._id);
	// selectedorganisation() {
	// 	this.form.controls['organisation_id'].setValue(this.defaultOrgValue.id);
	// }
	}
	selectedSubCategory(val: any) {
		// this.form.controls['organisation_id'].setValue(val.item._id);
	}
	selectedorganisation(val: any) {
		// this.form.controls['organisation_id'].setValue(val.item._id);
	}

	/**
	 * Send data from form to server. If success close page
	 */
	onSubmit() {
		const resource = this.form.value;
		resource.county = resource.county.id;
		resource.city = resource.city.id;
		this.resourcesService
			.addResource(this.form.value)
			.subscribe((element: any) => {
				console.log(element);
				this.location.back();
			});
	}
	selectedCategory(val: { item: string }) {
		this.form.controls.subcat.enable();
		this.resourcePlaceholder = 'Alegeți Resursă';
	}
}
