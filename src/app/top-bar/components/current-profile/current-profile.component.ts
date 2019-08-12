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
				const roles = [
					{
						id: 0,
						name: 'Ofițer'
					},
					{
						id: 1,
						name: 'Instituțional'
					},
					{
						id: 2,
						name: 'ONG'
					},
					{
						id: 3,
						name: 'DSU'
					},
				];
				this.user.role = roles[this.user.role].name;
			}, (error: any) => {
				console.log('Profile error: ', error);
			}
		);
	}


}
