import {
	Component,
	OnInit,
	Directive,
	Input,
	EventEmitter,
	Output,
	ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '@app/pages/organizations/organizations.service';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { AuthenticationService } from '@app/core';
import { TouchSequence } from 'selenium-webdriver';
import { Observable, Subject, merge } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	map
} from 'rxjs/operators';

@Component({
	selector: 'app-ngodetails',
	templateUrl: './ngodetails.component.html',
	styleUrls: ['./ngodetails.component.scss']
})
export class NgodetailsComponent implements OnInit {
	data: any;
	hasVolunteers = false;
	hasResources = false;
	isValid = true;
	form: FormGroup;
	counties: String[] = [];
	cities: String[] = [];
	cityPlaceholder = 'Selectați mai întâi județul';
	@ViewChild('instance', { static: true }) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
	@ViewChild('instance', { static: true }) instance1: NgbTypeahead;
	focus1$ = new Subject<string>();
	click1$ = new Subject<string>();
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService,
		private resourceService: ResourcesService,
		private organizationService: OrganizationService,
		private modalService: NgbModal,
		private fb: FormBuilder
	) {
		this.form = this.fb.group({
			category: ['', Validators.required],
			name: ['', Validators.required],
			quantity: ['', Validators.required],
			city: ['', Validators.required],
			county: ['', Validators.required]
		});
	}
	searchcounty = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);
		const clicksWithClosedPopup$ = this.click$.pipe(
			filter(() => !this.instance.isPopupOpen())
		);
		const inputFocus$ = this.focus$;
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
		const clicksWithClosedPopup$ = this.click1$.pipe(
			filter(() => !this.instance1.isPopupOpen())
		);
		const inputFocus$ = this.focus1$;
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
	ngOnInit() {
		this.organizationService
			.getOrganization(this.route.snapshot.paramMap.get('id'))
			.subscribe(data => {
				this.data = data;
				// if(data.volunteer){this.hasVolunteers = true}
			});
	}
	/**
	 * open add resource modal
	 */
	openVerticallyCentered(content: any) {
		this.modalService.open(content, { centered: true });
	}
	/**
	 * submit form and close modal
	 */

	onSubmit() {
		this.form.controls['organisation_id'].setValue(
			this.route.snapshot.paramMap.get('id')
		);
		this.organizationService
			.addResource(this.form.value)
			.subscribe((element: any) => {
				console.log(element);
				this.modalService.dismissAll();
			});
	}
	clear() {
		this.authService.setCredentials();
	}
	// onSort({column, direction}: SortEvent) {
	// 	console.log(column, ' <-> ', direction);
	// }
}
