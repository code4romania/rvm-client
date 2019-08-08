import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VolunteerService } from '../../../volunteers.service';

@Component({
	selector: 'app-volunteer-details',
	templateUrl: './volunteer-details.component.html',
	styleUrls: ['./volunteer-details.component.scss']
})
export class VolunteerDetailsComponent implements OnInit {
	data: any;
	hasAlocation = false;
	hasAccreditation = false;

	constructor(private volunteerService: VolunteerService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.volunteerService.getVolunteer(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
			this.data = data;
		});
	}

}
