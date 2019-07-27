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
	constructor(private authService: AuthenticationService) {}
	/**
	 * get Organization by id
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