import { AbstractControl } from '@angular/forms';

export class SsnValidation {
	static ssnValidation(abstractControl: AbstractControl): any {
		const ssn = abstractControl.value;

		if (ssn.length !== 13) {
			return { 'ssn': true};
		}
	}
}
