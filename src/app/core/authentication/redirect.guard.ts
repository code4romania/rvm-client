import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RedirectGuard implements CanActivate {
	private currentUser: any;

	constructor(private authService: AuthenticationService,
		private router: Router) {
		this.currentUser = this.authService.user;
	}

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
