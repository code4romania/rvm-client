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

	/**
	* Main application component
	*/
	constructor() {
	}
}
