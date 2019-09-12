import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/core/service/users.service';
import { EmailValidation } from '@app/core/validators/email-validation';
import { PhoneValidation } from '@app/core/validators/phone-validation';
import { AuthenticationService, FiltersService } from '@app/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

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
	institutions: any[] = [];
	organisations: any[] = [];
	displayInstitution = false;
	displayOrganisation = false;

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
			institution: [''],
			organisation: ['']
		});

		this.currentUserRole = this.authService.accessLevel;

		if (this.route.snapshot.paramMap.get('role')) {
			this.role = this.route.snapshot.paramMap.get('role');
			this.setPageByRoles();
		}

		if (this.route.snapshot.paramMap.get('id')) {
			this.id = this.route.snapshot.paramMap.get('id');

			this.getData();
		}
	}

	setPageByRoles() {
		// edit
		if (this.user.role === '1') {
			this.form.controls['institution'].setValue(this.authService.user.institution._id);
			this.setInstitutions();
		}

		if (this.user.role === '2') {
			this.form.controls['organisation'].setValue(this.user.organisation._id);
			this.setOrganisations();
		}

		// add
		if ((this.role === '0' || this.role === '1') && this.authService.is('DSU')) {
			this.setInstitutions();
		}

		if (this.role === '2' && this.authService.is('DSU')) {
			this.setOrganisations();
		}
	}

	setOrganisations() {
		this.filterService.getorganisationbyName().subscribe(response => {
			this.organisations = response;
		});

		this.displayOrganisation = true;
		this.form.controls['organisation'].setValidators(Validators.required);
	}

	setInstitutions() {
		this.filterService.getInstitutionFilters().subscribe(response => {
			this.institutions = response;
		});

		this.displayInstitution = true;
		this.form.controls['organisation'].setValidators(Validators.required);
	}

	getData() {
		this.usersService.getUser(this.id).subscribe(response => {
			this.user = response;
			this.role = this.user.role;
			this.setPageByRoles();
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
				this.user.institution = this.form.value.institution;
			}

			if (this.role === '2') {
				this.user.organisation = this.form.value.organisation;
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
