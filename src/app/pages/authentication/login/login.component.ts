import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { finalize, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	/**
	 * Form that stores login data
	 */
	loginForm: FormGroup;
	/**
	 * Flag for html loader
	 */
	isLoading = false;
	/**
	 * Message to be displaied on error
	 */
	errorMessage: string;
	constructor(
		public router: Router,
		private authenticationService: AuthenticationService) {
		this.loginForm = new FormGroup({
			email: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		});
	}
	private _success = new Subject<string>();

	ngOnInit() {
		this._success.subscribe(message => (this.errorMessage = message));
		this._success
			.pipe(debounceTime(5000))
			.subscribe(() => (this.errorMessage = null));
	}
	/**
	 * On error broadcast message to ngb-alert.
	 * After DeboundeTime we set errorMessage to null
	 */
	public changeErrorMessage() {
		this._success.next(
			'Nu s-a putut realiza autentificarea, vă rugăm verificați datele și reîncercați'
		);
	}
	/**
	 * Login with username and password obtained from form {@link loginForm}.
	 *
	 * On success redirects to dashboard
	 */
	login() {
		this.router.navigate(['/'], { replaceUrl: true });
		this.isLoading = true;
		this.authenticationService
			.login(this.loginForm.value)
			.pipe(
				finalize(() => {
					this.loginForm.markAsPristine();
					this.isLoading = false;
				})
			)
			.subscribe(
				(credentials: any) => {
					if (credentials.user.role !== '0') {
						this.router.navigate(['/'], {
							replaceUrl: true
						});
					} else {
						this.changeErrorMessage();
					}
				},
				(error: any) => {
					this.changeErrorMessage();
					console.log('Login error: ', error);
				}
			);
	}
}
