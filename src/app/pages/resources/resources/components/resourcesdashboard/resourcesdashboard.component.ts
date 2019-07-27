import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { NgbdSortableHeader, SortEvent } from '@app/shared/sortable-header/NgbdSortableHeader.class';

@Component({
	selector: 'app-resourcesdashboard',
	templateUrl: './resourcesdashboard.component.html',
	styleUrls: ['./resourcesdashboard.component.scss']
})
export class ResourcesdashboardComponent implements OnInit {
	resourcesData: any;
	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

	onSort({column, direction}: SortEvent) {

		// resetting other headers
		this.headers.forEach(header => {
		if (header.sortable !== column) {
			header.direction = '';
		}
		});

		// sorting countries
		if (direction === '') {
			console.log('reset');
		} else {
			console.log(column, ' <-->', direction);
		// this.resourcesData = [...COUNTRIES].sort((a, b) => {
		// 	const res = compare(a[column], b[column]);
		// 	return direction === 'asc' ? res : -res;
		//})
		}
	}
	constructor(private resourceService: ResourcesService) { }
	ngOnInit() {
		this.resourceService.getResources().subscribe((data) => {
			this.resourcesData = data;
		});
	}

}
