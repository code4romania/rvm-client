import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	Validators,
	FormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { PasswordValidation } from '@app/core/validators/password-validation';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	resetPasswordForm: FormGroup;
	token: string;
	errorMessage = 'Parolele trebuie să corespundă și să conțină minim 8 caractere, o literă mare, un număr și un caracter special.';

	constructor(
		public router: Router,
		private authenticationService: AuthenticationService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		if (!!this.authenticationService.isAuthenticated()) {
			this.authenticationService.logout().subscribe(
				(didlogout: Boolean) => {
					if (didlogout) {
						this.router.navigate(['/login']);
					}
				},
				(error: any) => {
					console.log('logout error: ', error);
				});
		}


		this.route.params.subscribe(params => {
			this.token = params['token'];
		});

		this.resetPasswordForm = this.formBuilder.group(
			{
				password: ['',
					[
						Validators.required,
						Validators.minLength(8),
						PasswordValidation.passwordValidation
					]
				],
				confirmPassword: ['',
					[
						Validators.required,
						Validators.minLength(8),
						PasswordValidation.passwordValidation
					]
				]
			},
			{
				validator: PasswordValidation.MatchPassword
			}
		);
	}

	resetPassword() {
		// TODO handles this when backend ready
		this.authenticationService.resetPassword(this.resetPasswordForm.value.password, this.token).subscribe(response => {
			console.log(response);
			this.router.navigate(['/login']);
		});
	}
}
