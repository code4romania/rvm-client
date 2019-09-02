import { Component, HostBinding, Input, Output, EventEmitter, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-table-search',
	templateUrl: './table-search.component.html'// ,
	// styleUrls: ['./table-search.directive.scss']
})
export class TableSearchComponent implements OnInit {
	_pager: any = {};
	// @HostBinding('class.sort') active = false;
	// @HostBinding('class.asc') asc = false;
	// @HostBinding('class.desc') desc = false;
	@ViewChild('searchInput', {static: true}) movieSearchInput: ElementRef;

	get pager(): any {
		return this._pager;
	}

	@Input()
	set pager(data: any) {
		this._pager = data;
		// this.active = this._pager.sort === this.value;
		// this.asc = this._pager.sort === this.value && this._pager.method === 'ASC';
		// this.desc = this._pager.sort === this.value && this._pager.method === 'DESC';
	}

	@Output() searchChanged = new EventEmitter();

	// @HostListener('click') onClick() {
	// 	this.sort();
	// }


	constructor() {
	}


	ngOnInit() {
		fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
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
	search(term: string) {
		// if (this.pager.search === this.value) {
		// 	this.pager.method = this.pager.method === 'ASC' ? 'DESC' : 'ASC';
		// } else {
		// 	this.pager.method = 'ASC';
		// }
		this.pager.search = term;
		this.searchChanged.emit({...this.pager});
	}

}
