import { Component } from '@angular/core';

@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	user = {
		'email': 'test13@test.com'
	};
	constructor() {}
}
