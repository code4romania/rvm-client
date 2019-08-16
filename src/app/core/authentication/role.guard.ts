import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private authService: AuthenticationService,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const roles = route.data['roles'].map((elem: string) => elem);
		const type = this.authService.role;

		console.log(roles, type);

		if (roles.indexOf(type) < 0) {
			this.router.navigate(['/'], {
				replaceUrl: true
			});
			return false;
		}

		return true;
	}
}
