import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { VolunteerService } from '../../../volunteers.service';

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
				private router: Router) { }

	ngOnInit() {
		this.volunteerService.getVolunteer(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
			this.data = data;
			if (data.courses && data.courses.length > 0) {this.hasAccreditation = true; }
		});
	}
	edit() {
		const aux = {...this.data};
		aux.city = this.data.city.name;
		aux.county = this.data.county.name;
		const navigationExtras: NavigationExtras = {
			state: {
				volunteer: aux
			}
		};
		this.router.navigateByUrl('/volunteers/add', navigationExtras);
	}

}
