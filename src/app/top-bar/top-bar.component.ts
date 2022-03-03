import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';
import { TopBarLink, TopBarLinks } from './top-bar.links';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent implements OnInit {
	public links = this.getLinks();

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

	getLinks() {
		return TopBarLinks.map(item=>{
			var element = new TopBarLink();
			element.label = item.label;
			element.routerLink = item.routerLink;
			element.condition = item.condition?item.condition:"true";
			return element;
		});
	}
}
