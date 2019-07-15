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