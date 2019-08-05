import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';

@Component({
	selector: 'app-recover-password',
	templateUrl: './recover-password.component.html',
	styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
	resetPasswordForm: FormGroup;

	constructor(
		public router: Router,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
		this.resetPasswordForm = new FormGroup({
			email: new FormControl('', [Validators.required])
		});
	}

	resetPassword() {
		console.log('sent');
		// TODO handles this when backend ready
	}
}
