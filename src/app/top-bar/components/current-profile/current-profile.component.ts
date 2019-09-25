import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';

@Component({
	selector: 'app-current-profile',
	templateUrl: './current-profile.component.html',
	styleUrls: ['./current-profile.component.scss']
})
export class CurrentProfileComponent implements OnInit {
/**
	 * user to be displayed
	 */
	user: any = {
		'email': 'no login'
	};

	constructor(public authService: AuthenticationService) {}
	/**
	 * get current user from server
	 */
	ngOnInit() {
		this.user = this.authService.user;
	}
/**
	 * parse roleNumber in order to display role abreviation
	 */
	parseRole(roleNumber: number): string {
		const roles = ['OFF', 'INS', 'NGO', 'DSU'];
		return roles[roleNumber];
	}
}
