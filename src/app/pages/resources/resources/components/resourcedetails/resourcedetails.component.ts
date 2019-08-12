import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '@app/pages/organizations/organizations.service';


@Component({
	selector: 'app-resourcedetails',
	templateUrl: './resourcedetails.component.html',
	styleUrls: ['./resourcedetails.component.scss']
})
export class ResourcedetailsComponent implements OnInit {
	data: any;
	organizations: any[] = null;
	resid: string;
	constructor(private resourceService: ResourcesService,
				private route: ActivatedRoute,
				private router: Router) {
					this.resid = this.route.snapshot.paramMap.get('id');
				}

	ngOnInit() {
		this.getData();
	}

	deleteSelf() {
		this.resourceService.deleteResource(this.resid).subscribe((data) => {
			this.router.navigateByUrl('/resources');
		});
	}
	getData() {
		this.resourceService.getResource((this.resid)).subscribe((data) => {
			this.data = data;
			this.organizations = [data.organisation];
			// this.resourceService.getOrganizationbyResources(data.name).subscribe((resdata) => {
			// 	this.organizations = resdata;
			// 	console.log(resdata);
			// });
		});
	}

}
