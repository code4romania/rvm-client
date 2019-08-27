import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
	selector: 'app-resource-details',
	templateUrl: './resource-details.component.html',
	styleUrls: ['./resource-details.component.scss']
})
export class ResourcedetailsComponent implements OnInit {
	data: any;
	organisations: any[] = null;
	resid: string;
	pager: any = {};
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
	sortChanged(pager: any) {
		this.pager = pager;
	// 	this.getData();
	}
	getData() {
		this.resourceService.getResource(this.resid).subscribe((data) => {
			this.data = data;
			this.organisations = [data.organisation];
			// this.resourceService.getorganisationbyResources(data.name).subscribe((resdata) => {
			// 	this.organisations = resdata;
			// 	console.log(resdata);
			// });
		});
	}

}
