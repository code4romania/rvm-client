import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '@app/pages/organizations/organizations.service';

@Component({
	selector: 'app-ngodashboard',
	templateUrl: './ngodashboard.component.html',
	styleUrls: ['./ngodashboard.component.scss']
})
export class NgodashboardComponent implements OnInit {

	constructor(private organizationService: OrganizationService) { }
	data: any[] = [];
	model = 'block';
	ngOnInit() {
		this.data = this.organizationService.getData();
		console.log(this.data);
	}

}
