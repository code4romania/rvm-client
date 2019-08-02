import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { ActivatedRoute } from '@angular/router';


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
		this.resourceService.getResource((this.route.snapshot.paramMap.get('id'))).subscribe((data) => {
			this.data = data;
			this.organizations = data.organization ? [data.organisation] : null;
		});
	}

}
