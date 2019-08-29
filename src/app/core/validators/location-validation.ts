import { AbstractControl } from '@angular/forms';

export class LocationValidation {
	static locationValidation(abstractControl: AbstractControl): any {
		const locationObject = abstractControl.value;

		if (locationObject.name && locationObject._id) {
			return null;
		}

		return { 'obj' : true };
	}
}
