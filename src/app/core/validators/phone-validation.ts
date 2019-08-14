import { AbstractControl } from '@angular/forms';

export class PhoneValidation {
	static phoneValidation(abstractControl: AbstractControl): any {
		const phone = abstractControl.value;
		const reg = new RegExp('^[+]{0,1}[0-9]+$');

		if (reg.test(phone) && phone.length <= 12 && phone.length >= 10) {
			return null;
		}

		return { 'phone': true };
	}
}
