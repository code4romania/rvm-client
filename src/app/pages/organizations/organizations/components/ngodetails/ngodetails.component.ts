import { Component, OnInit, Directive, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '@app/pages/organizations/organizations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { AuthenticationService } from '@app/core';
import { TouchSequence } from 'selenium-webdriver';



@Component({
	selector: 'app-ngodetails',
	templateUrl: './ngodetails.component.html',
	styleUrls: ['./ngodetails.component.scss']
})
export class NgodetailsComponent implements OnInit {
	data: any;
	isValid = true;
	resourceFields: any;
	resourceData: any;
	form: FormGroup;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService,
		private resourceService: ResourcesService,
		private organizationService: OrganizationService,
		private modalService: NgbModal,
		private fb: FormBuilder) {
			this.form = this.fb.group({
				category: ['', Validators.required],
				name: ['', Validators.required],
				quantity: ['', Validators.required],
				city: ['', Validators.required],
				county: ['', Validators.required],
			});
		}

	ngOnInit() {
		this.organizationService.getOrganization(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
			this.data = data;
		});
		this.resourceService.getResources().subscribe((data) => {
			this.resourceData = data;
		});
	}
	/**
	 * open add resource modal
	 */
	openVerticallyCentered(content: any) {
		this.modalService.open(content, { centered: true });
	}
	/**
	 * submit form and close modal
	 */

	onSubmit() {
		this.form.controls['organisation_id'].setValue(this.route.snapshot.paramMap.get('id'));
		this.organizationService.addResource(this.form.value).subscribe((element: any) => {
			console.log(element);
			this.modalService.dismissAll();
		});
	}
	clear(){
		this.authService.setCredentials();
	}
	// onSort({column, direction}: SortEvent) {
	// 	console.log(column, ' <-> ', direction);
	// }
}
