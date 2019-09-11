import { Directive, HostBinding, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
	selector: '[appTableSort]'
})
export class TableSortDirective {
	_pager: any = {};

	@HostBinding('class.sort') active = false;
	@HostBinding('class.asc') asc = false;
	@HostBinding('class.desc') desc = false;

	@Input() value: any;

	get pager(): any {
		return this._pager;
	}

	@Input()
	set pager(data: any) {
		this._pager = data;
		this.active = this._pager.sort === this.value;
		this.asc = this._pager.sort === this.value && this._pager.method === 'ASC';
		this.desc = this._pager.sort === this.value && this._pager.method === 'DESC';
	}

	@Output() sortChanged = new EventEmitter();

	@HostListener('click') onClick() {
		this.sort();
	}

	constructor() {
	}

	sort() {
		if (this.pager.sort === this.value) {
			this.pager.method = this.pager.method === 'ASC' ? 'DESC' : 'ASC';
		} else {
			this.pager.method = 'ASC';
		}
		this.pager.sort = this.value;
		this.sortChanged.emit({...this.pager});
	}

}
