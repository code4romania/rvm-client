import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core';

@Component({
	selector: 'app-resource-list',
	templateUrl: './resource-list.component.html',
	styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

	data: any;
	resources: any[] = null;
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
		this.pager = this.resourceService.getPager();
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
		this.getData();
	}

	getData() {
		this.resourceService.getResourceBySlug(this.resid, this.pager).subscribe((response: any) => {
			this.data = response.data[0];
			this.resources = response.data;
			this.pager.total = response.pager.total;
		});
	}

}
