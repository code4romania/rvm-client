import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationService } from '@app/pages/organizations/organizations.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-ngoadd',
	templateUrl: './ngoadd.component.html',
	styleUrls: ['./ngoadd.component.scss']
})
export class NgoaddComponent implements OnInit {
	form: FormGroup;
	isValid = true;
	data: any;
	constructor(public organizationService: OrganizationService, private router: Router) { }

	ngOnInit() {
		this.form = this.toFormGroup();
	}
	/**
	 * Convert object from json to formcontroll and group in order to have dynamic fields
	 * @returns {FormGroup} to display in <form> element
	 */
	toFormGroup() {
		const group: any = {};
		this.data = this.organizationService.getngoFields();
		this.data.forEach((question: any ) => {
			group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
													: new FormControl(question.value || '');
		});
		return new FormGroup(group);
		}
	/**
	 * Send data from form to server. If success close page
	 */
	onSubmit() {
		this.organizationService.addOrganization(this.form.value).subscribe((element: any) => {
			console.log(element);
			this.navigateToDashboard();
		});
	}
	navigateToDashboard() {
		this.router.navigate(['organizations']);
	}
}
