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
	_id: number;
	@Input()
	set id(data: any) {
		this._id = data;
	}
	get id() {
		return this._id;
	}
	@ViewChild('searchInput', {static: true}) movieSearchInput: ElementRef;

	get pager(): any {
		return this._pager;
	}

	@Input()
	set pager(data: any) {
		this._pager = data;
	}

	@Output() searchChanged = new EventEmitter();


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
		this.pager.filters[this.id] = term;
		this.searchChanged.emit({...this.pager});
	}

}
