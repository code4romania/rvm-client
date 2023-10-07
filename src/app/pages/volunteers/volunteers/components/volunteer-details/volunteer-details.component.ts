import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerService } from '../../../volunteers.service';
import { AuthenticationService } from '@app/core';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
	selector: 'app-volunteer-details',
	templateUrl: './volunteer-details.component.html',
	styleUrls: ['./volunteer-details.component.scss']
})
export class VolunteerDetailsComponent implements OnInit {
	/**
	 * store volunteer data
	 */
	public data: any;
	/**
	* flag for ngtemplate in HTML
	*/
	hasAlocation = false;
	hasAccreditation = false;
	/**
	 * flag for HTML to display edit button
	 */
	canEdit = true;
	/**
	 * flag for HTML to display loading animation
	 */
	loading = false;
	/**
	 * store alocations data
	 */
	allocations: any[] = [];

	/**
	 * Vounteer details component
	 */

	constructor(private volunteerService: VolunteerService,
		private route: ActivatedRoute,
		public authService: AuthenticationService,
		private router: Router,
		private location: Location) { }

	ngOnInit() {
		this.getData();
		this.getAllocations();
	}
/**
	 * edit this volunteer
	 */
	edit() {
		this.router.navigateByUrl(`/volunteers/edit/${this.data._id}`);
	}
/**
	 * delete this volunteer
	 */
	deleteSelf() {
		if (confirm('Sunteți sigur că doriți să ștergeți această intrare? Odată ștearsă nu va mai putea fi recuperată.')) {
			this.loading = true;
			this.volunteerService.deleteVolunteer(this.data._id).subscribe(() => {
				this.loading = false;
				this.location.back();
			}, () => {
				this.loading = false;
			});
		}
	}
/**
	 * get alocations data from server
	 */
	getAllocations() {
		this.volunteerService.getAllocations(this.route.snapshot.paramMap.get('id')).subscribe((data: any[]) => {
			this.allocations = data;

			if (this.allocations.length > 0) {
				this.hasAlocation = true;
			}
		});
	}
/**
	 * get volunteer data from server
	 */
	getData() {
		this.volunteerService.getVolunteer(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
			this.data = { ...data, updated_at: moment(data.updated_at) };

			if (data.courses && data.courses.length > 0) {
				this.hasAccreditation = true;
			}

			this.canEdit = this.authService.is('DSU') ||
			(this.authService.is('NGO') && (this.data.organisation._id === this.authService.user.organisation._id));
		});
	}

}
