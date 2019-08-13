import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	Validators,
	FormControl,
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
		this.route.params.subscribe(params => {
			this.token = params['token'];
		});

		this.resetPasswordForm = this.formBuilder.group(
			{
				password: ['', [
					Validators.required,
					Validators.minLength(8),
					Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
				confirmPassword: ['', [
					Validators.required,
					Validators.minLength(8),
					Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
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
