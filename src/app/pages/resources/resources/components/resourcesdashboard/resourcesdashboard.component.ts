import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';

@Component({
	selector: 'app-resourcesdashboard',
	templateUrl: './resourcesdashboard.component.html',
	styleUrls: ['./resourcesdashboard.component.scss']
})
export class ResourcesdashboardComponent implements OnInit {
	resourcesData: any;
	constructor(private resourceService: ResourcesService) { }
	ngOnInit() {
		this.resourceService.getResources().subscribe((data) => {
			this.resourcesData = data;
		});
	}

}
