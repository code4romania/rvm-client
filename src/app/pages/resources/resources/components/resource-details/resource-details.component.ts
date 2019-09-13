import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { Location } from '@angular/common';


@Component({
	selector: 'app-resource-details',
	templateUrl: './resource-details.component.html',
	styleUrls: ['./resource-details.component.scss']
})
export class ResourcedetailsComponent implements OnInit {
	public data: any;
	canEdit = true;
	loading = false;
	constructor(private resourceService: ResourcesService,
		private route: ActivatedRoute,
		public authService: AuthenticationService,
		private router: Router,
		private location: Location) { }

	ngOnInit() {
		this.getData();
	}

	edit() {
		this.router.navigateByUrl(`/resources/edit/${this.data._id}`);
	}

	deleteSelf() {
		if (confirm('Sunteți sigur că doriți să ștergeți această intrare? Odată ștearsă nu va mai putea fi recuperată.')) {
			this.loading = true;
			this.resourceService.deleteResource(this.data._id).subscribe(() => {
				this.loading = false;
				this.location.back();
			}, () => {
				this.loading = false;
			});
		}
	}


	getData() {
		this.resourceService.getResource(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
			this.data = data;

			this.canEdit = this.authService.is('DSU') ||
			(this.authService.is('NGO') && (this.data.organisation._id === this.authService.user.organisation._id));
		});
	}

}
