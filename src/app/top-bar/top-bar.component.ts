import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent implements OnInit {
	/**
	 * top bar to be shown over all the other components
	 */
	constructor(public authService: AuthenticationService,
		private router: Router) {}

  ngOnInit() { }

  /**
	 * logout from account
	 */
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

  /**
	 * go to home path on icon click
	 */
	goToDashboard() {
		this.router.navigate(['/' + this.authService.homePath()], {
			replaceUrl: true
		});
	}
}
