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
	isDSU = false;
	isNGO = false;
	isINSTITUT = false;
	constructor(private authService: AuthenticationService, private router: Router) {
		this.isDSU = false;
		this.isNGO = false;
		this.isINSTITUT = false;
	}

	ngOnInit() {
		switch (this.authService.role) {
			case '1':
				this.isINSTITUT = true;
				break;
			case '2':
				this.isNGO = true;
				break;
			case '3':
				this.isDSU = true;
				break;

			default:
				break;
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
}
