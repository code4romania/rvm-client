import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { VolunteerService } from '../../../volunteers.service';
import { AuthenticationService } from '@app/core';

@Component({
	selector: 'app-volunteer-details',
	templateUrl: './volunteer-details.component.html',
	styleUrls: ['./volunteer-details.component.scss']
})
export class VolunteerDetailsComponent implements OnInit {
	public data: any;
	hasAlocation = false;
	hasAccreditation = false;

	constructor(private volunteerService: VolunteerService, private route: ActivatedRoute,
			public authService: AuthenticationService, private router: Router) { }

	ngOnInit() {
		this.volunteerService.getVolunteer(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
			this.data = data;
			if (data.courses && data.courses.length > 0) {this.hasAccreditation = true; }
		});
	}
	edit() {
		this.router.navigateByUrl(`/volunteers/edit/${this.data._id}`);
	}

}
