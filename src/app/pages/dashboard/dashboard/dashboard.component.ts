import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';

@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	user: any = {
		'email': 'no login'
	};
	constructor(private authService: AuthenticationService,
			private router: Router) {
				this.router.routeReuseStrategy.shouldReuseRoute = function() {
					return false;
				};
			}

	/**
	 * Get user profile and display on page
	 */
	ngOnInit() {
		if (this.authService.role === '2') {
			// TO-DO GET FROM BACKEND
			this.router.navigate(['organisations/id/4a7d54364a7156b6c12e5492cb0016f1']);
		} else if (this.authService.role === '1') {
			this.router.navigate(['users']);
		}
		// this.authService.profile().subscribe(
		// 	(user: any) => {
		// 		this.user = user;
		// 		const roles = [
		// 			{
		// 				id: 0,
		// 				name: 'Ofițer de intervenție'
		// 			},
		// 			{
		// 				id: 1,
		// 				name: 'Administratorul instituțional'
		// 			},
		// 			{
		// 				id: 2,
		// 				name: 'Administrator ONG'
		// 			},
		// 			{
		// 				id: 3,
		// 				name: 'Administrator DSU'
		// 			},
		// 		];
		// 		this.user.role = roles[this.user.role].name;
		// 	}, (error: any) => {
		// 		console.log('Profile error: ', error);
		// 	}
		// );
	}
}
