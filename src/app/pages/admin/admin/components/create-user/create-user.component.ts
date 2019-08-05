import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-create-user',
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			name: ['', Validators.required],
			role: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required]
		});
	}

	ngOnInit() {}

	/**
	 * Send data from form to server. If success close page
	 */
	onSubmit() {
		console.log('form:', this.form.value);
	}
}
