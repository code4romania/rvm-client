import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-table-search',
	templateUrl: './table-search.component.html'// ,
	// styleUrls: ['./table-search.directive.scss']
})
/**
	 * Reusable table search component
	 */
export class TableSearchComponent implements OnInit {
	/**
	 * internal pager value
	 */
	_pager: any = {};
	/**
	 * internal id for filter
	 */
	_id: number;
	/**
	 * input val to set id for filter
	 */
	@Input()
	set id(data: any) {
		this._id = data;
	}
	/**
	 * return id
	 */
	get id() {
		return this._id;
	}
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	/**
		 * return pager
		 */
	get pager(): any {
		return this._pager;
	}
	/**
		 *  input val to set pager for filter
		 */
	@Input()
	set pager(data: any) {
		this._pager = data;
	}
	/**
		 *  Observable sortChanged for triggering modifications in the main component
		 */
	@Output() searchChanged = new EventEmitter();


	constructor() {
	}


	ngOnInit() {
		/**
	 *  register to key events in the referenced input
	 */
		fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(500),
			map((event: any) => {
				return event.target.value;
			}),
			filter(res => res.length > 2 || res.length === 0),
			distinctUntilChanged(),
		).subscribe(term => {
			this.search(term);
		});
	}
	/**
	 * emit search event with the input term
	 * @param {string} term the current value of the input
	 */
	search(term: string) {
		this.pager.filters[this.id] = term;
		this.searchChanged.emit({ ...this.pager });
	}

}
