import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '@app/core/authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) {}
	/**
	 * @returns Boolean based on authentification Service isAuthenificated Answer
	 *
	 * else redirect to login
	 */
	canActivate(): boolean {
		if (this.authenticationService.isAuthenticated()) {
			return true;
		}

		console.log('Not authenticated, redirecting...');
		this.router.navigate(['/login'], {
			replaceUrl: true
		});
		return false;
	}
}
