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
	errorMessage: string = null;
	loading = false;

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
		this.loading = true;
		this.authenticationService.resetPassword(this.resetPasswordForm.value.password, this.token).subscribe(response => {
			this.loading = false;
			this.errorMessage = null;
			this.router.navigate(['/login']);
		}, error => {
			this.loading = false;

			// tslint:disable-next-line: max-line-length
			this.errorMessage = 'Token-ul de resetare al parolei nu este valid, te rugăm să reîncerci din email-ul primit. Dacă problema persistă, te rugăm să ceri din nou schimbarea parolei.';
		});
	}
}
