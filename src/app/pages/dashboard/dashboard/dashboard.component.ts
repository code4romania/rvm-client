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
	ngOnInit() {
		this.authService.profile().subscribe(
			(user: any) => {
				this.user = user;
				this.user.role = 'DSU';
			}, (error: any) => {
				console.log('Profile error: ', error);
			}
		);
	}
}
