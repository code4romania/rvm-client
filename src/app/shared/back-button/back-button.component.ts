import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-back-button',
	templateUrl: './back-button.component.html',
	styleUrls: ['./back-button.component.scss']
})

export class BackButtonComponent implements OnInit {

	/**
	 * reusable back button component
	 */
	constructor(private location: Location) { }

	/**
	 * Angular ng on init
	 */
	ngOnInit() { }

	/**
	 * goes back in navigation history
	 */
	goBack() {
		this.location.back();
	}

}
