import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '@app/pages/organizations/organizations.service';

@Component({
	selector: 'app-ngodetails',
	templateUrl: './ngodetails.component.html',
	styleUrls: ['./ngodetails.component.scss']
})
export class NgodetailsComponent implements OnInit {
	data: any;
	constructor(private route: ActivatedRoute,
		private router: Router,
		private organizationService: OrganizationService) { }

	ngOnInit() {
		this.data = this.organizationService.getOne(this.route.snapshot.paramMap.get('id'));
		
	}

}
