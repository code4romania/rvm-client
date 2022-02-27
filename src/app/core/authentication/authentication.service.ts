import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from '@app/core/local-storage.service';
import { Credentials, LoginPayload, SignupPayload, User } from '../model/authentication.model';

/**
* Local storage variable name
*/
const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
	private _credentials: Credentials | null;

	private roles = ['OFF', 'INS', 'NGO', 'DSU'];
	private homes = ['', 'users', 'organisations/id/:id', 'organisations'];

	/**
	* Authentication service constructor.
	*/
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
	 * @param {LoginPayload} payload  Login with object of specific type
	 *
	 * Function auto stores credentials for future use.
	 *
	 * @returns The post result mapped to Credentials type, not useful since its just a token
	 *
	 */
	login(
		payload: LoginPayload
	): Observable<any> {

		return this.httpClient.post('/login', payload).pipe(map((credentials: any) => {
			if (credentials.user.role !== '0') {
				this.setCredentials(credentials);
			}
			return credentials;
		}));
	}
	/**
	 *
	 * @param {SignupPayload} payload  Signup with object of specific type
	 *
	 * @returns The post result mapped to User type, not very useful
	 *
	 */
	signup(
		payload: SignupPayload
	): Observable<User> {
		return this.httpClient.post('/register', payload).pipe(
			map((body: User) => {
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
	get credentials(): Credentials | null {
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

	/**
	* Get current user access level based on role
	*/
	get accessLevel(): any {
		if (!this.isAuthenticated()) {
			return;
		}
		return this._credentials.user.role;
	}

	/**
	* Get current user role
	*/
	get role() {
		if (!this.isAuthenticated()) {
			return;
		}
		return this.roles[this.accessLevel] ? this.roles[this.accessLevel] : 'OFF';
	}

	/**
	* Get current user
	*/
	get user(): any | null {
		if (!this.isAuthenticated()) {
			return;
		}

		return this._credentials.user;
	}

	/**
	* Check if current user has a specific role
	*/
	public is(...roles: string[]) {
		if (!this.isAuthenticated()) {
			return false;
		}

		return roles.indexOf(this.role) > -1;
	}

	/**
	* Get current user home path
	*/
	public homePath() {
		if (!this.isAuthenticated()) {
			return '';
		}

		if (this._credentials.user.organisation) {
			return this.homes[this.accessLevel].replace(':id', this._credentials.user.organisation._id);
		} else {
			return this.homes[this.accessLevel];
		}
	}

	/**
	 * Sets the user credentials.
	 *
	 * @param {Credentials=} Credentials The user credentials.
	 */
	public setCredentials(credentials?: Credentials) {
		this._credentials = credentials || null;
		if (credentials) {
			this.localStorageService.setItem(
				credentialsKey,
				JSON.stringify(credentials)
			);
		} else {
			this.localStorageService.clearItem(credentialsKey);
		}
	}

	/**
	* Recover user password service endpoint
	*/
	public recoverPassword(email: string) {
		return this.httpClient.post('/recoverpassword', { email: email });
	}

	/**
	* Reset user password service endpoint
	*/
	public resetPassword(password: string, token: string) {
		return this.httpClient.post('/resetpassword', { password: password, password_confirmation: password, token: token });
	}
}
