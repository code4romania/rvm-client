import { Component, OnInit } from '@angular/core';
import { CurrentProfileComponent } from './components/current-profile/current-profile.component';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';
@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
	constructor(public authService: AuthenticationService, private router: Router) {

	}

	ngOnInit() {

	}
	logout() {
		this.authService.logout().subscribe(
		(didlogout: Boolean) => {
			if (didlogout) {
				this.router.navigate(['/login']);
			}
		},
		(error: any) => {
			console.log('logout error: ', error);
		});
	}
}
