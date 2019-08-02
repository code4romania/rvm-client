import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '@app/pages/volunteers/volunteers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-volunteerdetails',
	templateUrl: './volunteerdetails.component.html',
	styleUrls: ['./volunteerdetails.component.scss']
})
export class VolunteerdetailsComponent implements OnInit {
	data: any;
	Alocari: [
		{
			name: 'ion',
			date: '19.03.2019',
			city: 'Sector 2',
			county: 'Bucuresti',
		},
		{
			name: 'dan',
			date: '29.07.2019',
			city: 'Giurgiu',
			county: 'Giurgiu',
		}
	];
	Acreditare: [
		{
			name: 'test',
			date: '19.03.2019',
			org: 'text1'
		},
		{
			name: 'test',
			date: '19.03.2019',
			org: 'text2'
		}
	];
	constructor(private volunteerService: VolunteerService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.volunteerService.getVolunteer(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
			this.data = data;
		});
	}

}
