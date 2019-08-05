import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
	static MatchPassword(abstractControl: AbstractControl): any {
		const password = abstractControl.get('password').value;
		const confirmPassword = abstractControl.get('confirmPassword').value;

		if (password !== confirmPassword) {
			abstractControl
				.get('confirmPassword')
				.setErrors({ MatchPassword: true });
		} else {
			return null;
		}
	}
}
