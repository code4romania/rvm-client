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
	toFormGroup() {
		const group: any = {};
		this.data = this.organizationService.getFields();
		this.data.forEach((question: any ) => {
			group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
													: new FormControl(question.value || '');
		});
		return new FormGroup(group);
		}
	onSubmit() {
		this.organizationService.addToData(this.form.value);
		this.navigateToDashboard();
	}
	navigateToDashboard() {
		this.router.navigate(['organizations']);
	}
}
