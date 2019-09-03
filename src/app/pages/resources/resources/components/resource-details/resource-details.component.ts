import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core';


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
	loading = false;

	constructor(private resourceService: ResourcesService,
				private route: ActivatedRoute,
				public authService: AuthenticationService,
				private router: Router) {
					this.resid = this.route.snapshot.paramMap.get('id');
				}

	ngOnInit() {
		this.getData();
	}

	deleteSelf(resId: string) {
		if (confirm('Sunteți sigur că doriți să ștergeți această intrare? Odată ștearsă nu va mai putea fi recuperată.')) {
			this.loading = true;
			this.resourceService.deleteResource(resId).subscribe((data) => {
				this.loading = false;
				this.router.navigateByUrl('/resources');
			}, () => {
				this.loading = false;
			});
		}
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
