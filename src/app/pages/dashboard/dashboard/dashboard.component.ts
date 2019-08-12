import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';

@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	user: any = {
		'email': 'no login'
	};
	constructor(private authService: AuthenticationService) {}

	/**
	 * Get user profile and display on page
	 */
	ngOnInit() {
		this.authService.profile().subscribe(
			(user: any) => {
				this.user = user;
				const roles = [
					{
						id: 0,
						name: 'Ofițer de intervenție'
					},
					{
						id: 1,
						name: 'Administratorul instituțional'
					},
					{
						id: 2,
						name: 'Administrator ONG'
					},
					{
						id: 3,
						name: 'Administrator DSU'
					},
				];
				this.user.role = roles[this.user.role].name;
			}, (error: any) => {
				console.log('Profile error: ', error);
			}
		);
	}
}
