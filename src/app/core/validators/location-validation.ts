import { AbstractControl } from '@angular/forms';

export class LocationValidation {
	/**
	* Location validator for reactive forms
	*/
	static locationValidation(abstractControl: AbstractControl): any {
		const locationObject = abstractControl.value;

		if ( locationObject.hasOwnProperty('_id')) {
			return null;
		}

		return { 'obj' : true };
	}
}
