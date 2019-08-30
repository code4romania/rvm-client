import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

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
	canActivate(route: ActivatedRouteSnapshot): boolean {
		const isDashboard = !!route.data['dashboard'];
		if (this.authenticationService.isAuthenticated() && this.authenticationService.accessLevel !== '0') {
			if (isDashboard && (!route.children || !route.children.length)) {
				this.router.navigate(['/' + this.authenticationService.homePath()], {
					replaceUrl: true
				});
			}
			return true;
		}

		this.router.navigate(['/login'], {
			replaceUrl: true
		});
		return false;
	}
}
