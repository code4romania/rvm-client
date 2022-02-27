import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '@app/core/authentication/authentication.service';

@Injectable()
export class AnonymousGuard implements CanActivate {
	/**
	* Angular anonymous user guard for routes
	*/
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }
	/**
	 * @returns Boolean based on authentification Service isAuthenticated Answer
	 *
	 * else redirect to home
	 */
	canActivate(): boolean {
		if (!this.authenticationService.isAuthenticated()) {
			return true;
		}

		this.router.navigate(['/'], {
			replaceUrl: true
		});
		return false;
	}
}
