import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';

@Component({
	selector: 'app-current-profile',
	templateUrl: './current-profile.component.html',
	styleUrls: ['./current-profile.component.scss']
})
export class CurrentProfileComponent implements OnInit {

	user: any = {
		'email': 'no login'
	};
	constructor(public authService: AuthenticationService) {}
	/**
	 * get organisation by id
	 */
	ngOnInit() {
		this.user = this.authService.user;
	}

	parseRole(roleNumber: number): string {
		const roles = ['OFF', 'INS', 'NGO', 'DSU'];
		return roles[roleNumber];
	}
}
