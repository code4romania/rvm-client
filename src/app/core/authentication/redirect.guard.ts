import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import { Observable } from 'rxjs';

/**
* Redirect if not logged in to home angular guard
*/
@Injectable()
export class RedirectGuard implements CanActivate {
	/**
	* Current user data
	*/
	private currentUser: any;

	/**
	* Redirect angular guard constructor
	*/
	constructor(private authService: AuthenticationService,
		private router: Router) {
		this.currentUser = this.authService.user;
	}
	/**
	 * Redirect guard will redirect the user to its specific home page.
	 */
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authService.isAuthenticated) {
			this.router.navigate([this.authService.homePath()]);
		}

		return false;
	}
}
