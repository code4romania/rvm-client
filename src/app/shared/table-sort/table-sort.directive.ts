import { Directive, HostBinding, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
	selector: '[appTableSort]'
})
export class TableSortDirective {
	/**
 * internal pager value
 */
	_pager: any = {};
	/**
	 * angular bindings for class display
	 */
	@HostBinding('class.sort') active = false;
	@HostBinding('class.asc') asc = false;
	@HostBinding('class.desc') desc = false;
	/**
		 * value
		 */
	@Input() value: any;
	/**
		 * return pager
		 */
	get pager(): any {
		return this._pager;
	}
	/**
		 * set pager from input value and adjendat values
		 */
	@Input()
	set pager(data: any) {
		this._pager = data;
		this.active = this._pager.sort === this.value;
		this.asc = this._pager.sort === this.value && this._pager.method === 'ASC';
		this.desc = this._pager.sort === this.value && this._pager.method === 'DESC';
	}
	/**
	 *  Observable sortChanged for triggering modifications in the main component
	 */
	@Output() sortChanged = new EventEmitter();
	/**
	 *  register to click events in the referenced input
	 */
	@HostListener('click') onClick() {
		this.sort();
	}

	constructor() {
	}
	/**
		 * emit sort event on click
		 */
	sort() {
		if (this.pager.sort === this.value) {
			this.pager.method = this.pager.method === 'ASC' ? 'DESC' : 'ASC';
		} else {
			this.pager.method = 'ASC';
		}
		this.pager.sort = this.value;
		this.sortChanged.emit({ ...this.pager });
	}

}
