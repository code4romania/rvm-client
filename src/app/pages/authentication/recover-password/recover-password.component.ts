import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { EmailValidation } from '@app/core/validators/email-validation';

@Component({
	selector: 'app-recover-password',
	templateUrl: './recover-password.component.html',
	styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
	/**
	 * Form holds data to be completed
	 */
	resetPasswordForm: FormGroup;
  /**
	 * flag for HTML to display loading animation
	 */
	loading = false;
	/**
	 * Message to be displaied on error
	 */
	errorMessage: string = null;

	constructor(
		public router: Router,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
		this.resetPasswordForm = new FormGroup({
			email: new FormControl('', [Validators.required, EmailValidation.emailValidation])
		});
	}
	/**
	 * Login with username and password obtained from form {@link resetPasswordForm}.
	 *
	 * On success redirects to dashboard
	 */
	resetPassword() {
		this.loading = true;
		this.authenticationService.recoverPassword(this.resetPasswordForm.value.email).subscribe(response => {
			this.loading = false;
			this.router.navigate(['/login']);
		}, error => {
			this.loading = false;
			this.errorMessage = 'Adresa de email specificată nu există. Te rugăm să verifici și să încerci din nou.';
		});
	}
}
