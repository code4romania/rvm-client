import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '@app/pages/organizations/organizations.service';


@Component({
	selector: 'app-resourcedetails',
	templateUrl: './resourcedetails.component.html',
	styleUrls: ['./resourcedetails.component.scss']
})
export class ResourcedetailsComponent implements OnInit {
	data: any;
	organizations: any[] = null;

	constructor(private resourceService: ResourcesService,
				private route: ActivatedRoute) { }

	ngOnInit() {
		this.getData();
	}


	getData() {
		this.resourceService.getResource((this.route.snapshot.paramMap.get('id'))).subscribe((data) => {
			this.data = data;
			this.organizations = [data.organisation];
			// this.resourceService.getOrganizationbyResources(data.name).subscribe((resdata) => {
			// 	this.organizations = resdata;
			// 	console.log(resdata);
			// });
		});
	}

}
