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
	/**
		 * data holds info about current resource
		 */
	data: any;
	/**
	 * list of resources with same slug
	 */
	resources: any[] = null;
	/**
	 * var holds slug of the resource
	 */
	resslug: string;
	/**
	 * pager for table
	 */
	pager: any = {};
	/**
	 * flag for HTML to display loading animation
	 */
	loading = false;

	constructor(private resourceService: ResourcesService,
		private route: ActivatedRoute,
		public authService: AuthenticationService,
		private router: Router) {
		this.resslug = this.route.snapshot.paramMap.get('id');
	}

	ngOnInit() {
		this.pager = this.resourceService.getPager();
		this.getData();
	}
	/**
	 * delete the selected res
	 * @param {string} resId of the resource that will be deleted
	 */
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
	/**
	 * when sorting we will set the pager and get data from server with the new pager
	 */
	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	/**
		 * get the resourses with the same slug from server
		 */
	getData() {
		this.resourceService.getResourceBySlug(this.resslug, this.pager).subscribe((response: any) => {
			this.data = response.data[0];
			this.resources = response.data;
			this.pager.total = response.pager.total;
		});
	}

}
