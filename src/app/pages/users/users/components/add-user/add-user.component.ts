import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/core/service/users.service';
import { EmailValidation } from '@app/core/validators/email-validation';
import { PhoneValidation } from '@app/core/validators/phone-validation';
import { AuthenticationService, FiltersService } from '@app/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {
	/**
	* form that holds data
	*/
	form: FormGroup;
	/**
	* role of user that will be created
	*/
	role: string;
	/**
	* user data
	*/
	user: any = {};
	/**
	 * flag for HTML to display loading animation
	 */
	loading = false;
	/**
	* references to NGBTypeahead for opening on focus or click
	*/
	@ViewChild('instance', { static: true }) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
	/**
	* list of institutions to pe parsed
	*/
	institutions: any[] = [];
	organisations: any[] = [];
	displayInstitution = false;
	displayOrganisation = false;

	constructor(private fb: FormBuilder,
		private router: Router,
		private filterService: FiltersService,
		public route: ActivatedRoute,
		public authService: AuthenticationService,
		private usersService: UsersService,
		private location: Location) { }

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			email: ['', [ Validators.required, EmailValidation.emailValidation ]],
			phone: ['', [ Validators.required, PhoneValidation.phoneValidation ]],
			institution: [''],
			organisation: ['']
		});

		if (this.route.snapshot.paramMap.get('role')) {
			this.role = this.route.snapshot.paramMap.get('role');
			this.setPageByRoles();
		}
	}

	setPageByRoles() {
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
		this.form.controls['institution'].setValidators(Validators.required);
	}

	/**
	 * trigger for select county from county typeahead. will unlock the city field
	 * @param {any} val result object from typeahead that needs to be stored
	 */
	selectedInstitut(val: { item: any }) {
		this.form.controls.institution.markAsTouched();
		this.form.patchValue({institution: val.item});
	}

	/**
	 * Process form values and send data to server. If success close page
	 */
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

		this.usersService.addUser(this.user).subscribe((response) => {
			this.loading = false;
			this.location.back();
		}, () => {
			this.setDuplicateEmailError();
			this.loading = false;
		});
	}

	setDuplicateEmailError() {
		this.form.controls['email'].setErrors({'email': 'Adresa de email introdusă există deja în sistem.'});
	}
}
