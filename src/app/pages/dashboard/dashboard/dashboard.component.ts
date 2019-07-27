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
				switch (this.user.role) {
					case '1':
						this.user.role = 'ONG';
						break;
					case '2':
						this.user.role = 'DSU';
						break;
					default:
						this.user.role = 'Ofiter';
						break;
				}
			}, (error: any) => {
				console.log('Profile error: ', error);
			}
		);
	}
}
