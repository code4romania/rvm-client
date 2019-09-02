import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerService } from '../../../volunteers.service';
import { AuthenticationService } from '@app/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-volunteer-details',
	templateUrl: './volunteer-details.component.html',
	styleUrls: ['./volunteer-details.component.scss']
})
export class VolunteerDetailsComponent implements OnInit {
	public data: any;
	hasAlocation = false;
	hasAccreditation = false;
	canEdit = true;

	constructor(private volunteerService: VolunteerService,
		private route: ActivatedRoute,
		public authService: AuthenticationService,
		private router: Router,
		private location: Location) { }

	ngOnInit() {
		this.volunteerService.getVolunteer(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
			this.data = data;
			if (data.courses && data.courses.length > 0) {this.hasAccreditation = true; }
			this.canEdit = this.authService.is('DSU') ||
			(this.authService.is('NGO') && (this.data.organisation._id === this.authService.user.organisation._id));
		});
	}

	edit() {
		this.router.navigateByUrl(`/volunteers/edit/${this.data._id}`);
	}

	deleteSelf() {
		this.volunteerService.deleteVolunteer(this.data._id).subscribe(() => {
			this.location.back();
		});
	}

}
