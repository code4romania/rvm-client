import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { LocalStorageService } from '@app/core/local-storage.service';

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
	private _credentials: Authentication.Credentials | null;
	public credentials$ = new EventEmitter<Authentication.Credentials>();

	private roles = ['OFF', 'INS', 'NGO', 'DSU'];
	private homes = ['', 'users', 'organisations/id/:id', 'organisations'];

	constructor(
		private httpClient: HttpClient,
		private localStorageService: LocalStorageService
	) {
		const savedCredentials = this.localStorageService.getItem(
			credentialsKey
		);
		if (savedCredentials) {
			this._credentials = JSON.parse(savedCredentials);
		}
	}
	/**
	 *
	 * @param {Authentication.LoginPayload} payload  Login with object of specific type
	 *
	 * Function auto stores credentials for future use.
	 *
	 * @returns The post result mapped to Credentials type, not useful since its just a token
	 *
	 */
	login(
		payload: Authentication.LoginPayload
	): Observable<any> {

		return this.httpClient.post('/login', payload).pipe(map((credentials: any) => {
				this.setCredentials(credentials);
				return credentials;
			}));
	}
	/**
	 *
	 * @param {Authentication.SignupPayload} payload  Signup with object of specific type
	 *
	 * @returns The post result mapped to User type, not very useful
	 *
	 */
	signup(
		payload: Authentication.SignupPayload
	): Observable<Authentication.User> {
		return this.httpClient.post('/register', payload).pipe(
			map((body: Authentication.User) => {
				return body;
			})
		);
	}

	/**
	 * Logs out the user and clear credentials.
	 * @return {Observable<boolean>} True if the user was logged out successfully.
	 */
	logout(): Observable<boolean> {
		return this.httpClient.get('/logout').pipe(
			map(() => {
				this.setCredentials();
				return true;
			})
		);
	}

	/**
	 * Checks is the user is authenticated.
	 *
	 * @return {boolean} True if the user is authenticated.
	 */
	isAuthenticated(): boolean {
		return !!this.credentials && !!this.credentials.user;
	}

	/**
	 * Gets the user credentials.
	 *
	 * @return {Credentials} The user credentials or null if the user is not authenticated.
	 */
	get credentials(): Authentication.Credentials | null {
		return this._credentials;
	}

	/**
	 * Get the auth token.
	 *
	 * @return {string} The auth token is null if user is not authenticated.
	 */
	get accessToken(): string | null {
		if (!this._credentials || !this._credentials.token) {
			return;
		}
		return this._credentials.token;
	}

	get accessLevel(): any {
		if (!this.isAuthenticated()) {
			return;
		}
		return this._credentials.user.role;
	}

	get role() {
		if (!this.isAuthenticated()) {
			return;
		}
		return this.roles[this.accessLevel] ? this.roles[this.accessLevel] : 'OFF';
	}

	get user(): any | null {
		if (!this.isAuthenticated()) {
			return;
		}

		return this._credentials.user;
	}

	public is(...roles: string[]) {
		if (!this.isAuthenticated()) {
			return false;
		}

		return roles.indexOf(this.role) > -1;
	}


	public homePath() {
		if (!this.isAuthenticated()) {
			return '';
		}
		return this.homes[this.accessLevel].replace(':id', this._credentials.user.organisation);
	}

	/**
	 * Sets the user credentials.
	 *
	 * @param {Credentials=} Authentication.Credentials The user credentials.
	 */
	public setCredentials(credentials?: Authentication.Credentials) {
		this._credentials = credentials || null;
		if (credentials) {
			this.localStorageService.setItem(
				credentialsKey,
				JSON.stringify(credentials)
			);
			this.credentials$.emit(this._credentials);
		} else {
			this.localStorageService.clearItem(credentialsKey);
		}
	}

	public recoverPassword(email: string) {
		return this.httpClient.post('/recoverpassword', {email: email});
	}

	public resetPassword(password: string, token: string) {
		return this.httpClient.post('/resetpassword', {password: password, password_confirmation: password, token: token});
	}
}
