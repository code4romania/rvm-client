import { Component, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['not-found.component.scss']
})

export class NotFoundComponent implements AfterViewInit {

	/**
	  * Component to show when a page is not found. Only displays 404 message
	  */
	ngAfterViewInit() {

	}
}
