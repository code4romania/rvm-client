import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent implements OnInit {
	currentUserId: string;

	constructor(public authService: AuthenticationService,
		private router: Router) {}

	ngOnInit() {
		if (this.authService.isAuthenticated()) {
			this.currentUserId = this.authService.user._id;
		}
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

	goToDashboard() {
		this.router.navigate(['/' + this.authService.homePath()], {
			replaceUrl: true
		});
	}
}
