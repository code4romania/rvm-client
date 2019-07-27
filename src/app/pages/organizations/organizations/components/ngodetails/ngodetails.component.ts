import { Component, OnInit, Directive, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '@app/pages/organizations/organizations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResourcesService } from '@app/pages/resources/resources.service';



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
		private resourceService: ResourcesService,
		private organizationService: OrganizationService,
		private modalService: NgbModal) { }

	ngOnInit() {
		this.organizationService.getOrganization(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
			this.data = data;
			this.form = this.toFormGroup();
		});
		this.resourceService.getResources().subscribe((data) => {
			this.resourceData = data;
		});
	}
	/**
	 * Convert object from json to formcontroll and group in order to have dynamic fields
	 * @returns {FormGroup} to display in <form> element
	 */
	toFormGroup() {
		const group: any = {};
		this.resourceFields = this.resourceService.getResourceFields();
		this.resourceFields.forEach((question: any ) => {
			group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
													: new FormControl(question.value || '');
		});
		return new FormGroup(group);
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
	// onSort({column, direction}: SortEvent) {
	// 	console.log(column, ' <-> ', direction);
	// }
}
