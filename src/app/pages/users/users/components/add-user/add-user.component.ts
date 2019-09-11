import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/core/service/users.service';
import { EmailValidation } from '@app/core/validators/email-validation';
import { PhoneValidation } from '@app/core/validators/phone-validation';
import { AuthenticationService, FiltersService } from '@app/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, merge, Subject } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	map,
	filter,
	switchMap,
} from 'rxjs/operators';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {
	form: FormGroup;
	role: string;
	id: string;
	user: any = {};
	currentUserRole = '';
	loading = false;
	@ViewChild('instance', { static: true }) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();

	constructor(private fb: FormBuilder,
		private router: Router,
		private filterService: FiltersService,
		public route: ActivatedRoute,
		public authService: AuthenticationService,
		private usersService: UsersService) { }

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			email: ['', [ Validators.required, EmailValidation.emailValidation ]],
			phone: ['', [ Validators.required, PhoneValidation.phoneValidation ]],
			institution: ['',  Validators.required]
		});

		this.currentUserRole = this.authService.accessLevel;

		if (this.route.snapshot.paramMap.get('role')) {
			this.role = this.route.snapshot.paramMap.get('role');

			if (this.authService.is('INS')) {
				this.form.controls['institution'].setValue(this.authService.user.institution._id);
			}
		}

		if (this.route.snapshot.paramMap.get('id')) {
			this.id = this.route.snapshot.paramMap.get('id');

			this.getData();
		}
	}

	formatter = (result: { name: string }) => result.name;
	searchinstitut = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(
			debounceTime(200),
			distinctUntilChanged()
		);

		const clicksWithClosedPopup$ = this.click$.pipe(
			filter(() => !this.instance.isPopupOpen())
		);

		const inputFocus$ = this.focus$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			// return text$.pipe(debounceTime(200),distinctUntilChanged(),
				switchMap((term: string) => {
					return this.filterService.getInstitutionFilters(term);
				}));
	}

	getData() {
		this.usersService.getUser(this.id).subscribe(response => {
			this.user = response;
			this.role = this.user.role;
			this.editForm();
		});
	}

	selectedInstitut(val: { item: any }) {
		this.form.controls.institution.markAsTouched();
		this.form.patchValue({institution: val.item});
	}

	editForm() {
		this.form.controls['name'].setValue(this.user.name);
		this.form.controls['email'].setValue(this.user.email);
		this.form.controls['phone'].setValue(this.user.phone);
		this.form.controls['institution'].setValue(this.user.institution);
	}

	onSubmit() {
		this.loading = true;
		this.user.name = this.form.value.name;
		this.user.email = this.form.value.email;
		this.user.phone = this.form.value.phone;

		if (this.role) {
			this.user.role = this.role;

			if (this.role === '1' || this.role === '0') {
				this.user.institution = this.form.value.institution._id;
			}
		}

		if (this.user._id) {
			// edit
			this.usersService.updateUser(this.user).subscribe((response) => {
				this.loading = false;
				this.router.navigate(['users']);
			}, () => {
				this.setDuplicateEmailError();
				this.loading = false;
			});
		} else {
			// add
			this.usersService.addUser(this.user).subscribe((response) => {
				this.loading = false;
				this.router.navigate(['users']);
			}, () => {
				this.setDuplicateEmailError();
				this.loading = false;
			});
		}
	}

	setDuplicateEmailError() {
		this.form.controls['email'].setErrors({'email': 'Adresa de email introdusă există deja în sistem.'});
	}
}
