import { Component } from '@angular/core';
import { AuthenticationService } from './core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app';

	constructor(private authService: AuthenticationService, private activatedRoute: ActivatedRoute) {
		console.log(activatedRoute.snapshot.url);
		if (this.authService.isAuthenticated) {
			// this.router.navigate(['/' + this.authService.homePath()], {
			// 	replaceUrl: true
			// });
		}
	}
}
