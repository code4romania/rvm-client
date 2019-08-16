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
		const roles = route.data['roles'].map((elem: string) => this.translate(elem));
		const type = this.authService.role;
		for (let i = 0; i < roles.length; i++) {
			if (roles[i] === type) {
				return true;
			}
		}
			// } else if (i === roles.length - 1) {
		this.router.navigate(['/'], {
			replaceUrl: true
		});
		return false;
	}
	translate(text: string): string {
		switch (text) {
			case 'INSTITUT':
				return '1';
			case 'NGO':
				return '2';
			case 'DSU':
				return '3';
			default:
				return '0';
		}
	}
}
