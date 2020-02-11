import { AbstractControl } from '@angular/forms';

export class EmailValidation {
	/**
	* Email validator for reactive forms
	*/
	static emailValidation(abstractControl: AbstractControl): any {
		const email = abstractControl.value;
		const reg = new RegExp(/^[a-z0-9\._%+-]+@[a-z0-9\.-]+\.[a-z]{2,4}$/);

		if (reg.test(email)) {
			return null;
		}

		return { 'email': 'Adresa de email introdusă nu este validă (ex: email@email.com).' };
	}
}
