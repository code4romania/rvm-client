import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/core';

export class RoleGuard implements CanActivate {
	constructor(
		private authService: AuthenticationService,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const roles = route.data['role'];
		const type = this.authService.getRole();
		for (let i = 0; i < roles.length; i++) {
			if (roles[i] === type) {
				return true;
			} else if (i === roles.length - 1) {
				this.router.navigate(['/'], {
					replaceUrl: true
				});

				return false;
			}
		}
	}
}
