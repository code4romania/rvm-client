import { Component, OnInit, Input } from '@angular/core';
/**
	 * @ignore
	 */
@Component({
	selector: 'app-button-loader',
	templateUrl: './button-loader.component.html',
	styleUrls: ['./button-loader.component.scss']
})
export class ButtonLoaderComponent implements OnInit {
	@Input()
	isLoading: boolean;
	@Input()
	label: string;

	constructor() { }

	ngOnInit() { }
}
