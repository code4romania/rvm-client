import { AbstractControl } from '@angular/forms';

export class EmailValidation {
	static emailValidation(abstractControl: AbstractControl): any {
		const email = abstractControl.value;
		const reg = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');

		if (reg.test(email)) {
			return null;
		}

		return { 'email': true };
	}
}
