import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
	static MatchPassword(abstractControl: AbstractControl): any {
		const password = abstractControl.get('password').value;
		const confirmPassword = abstractControl.get('confirmPassword').value;

		if (password !== confirmPassword) {
			return { MatchPassword: true };
		}

		return null;
	}

	static passwordValidation(abstractControl: AbstractControl): any {
		const number = new RegExp('\\d');
		const password = abstractControl.value;
		const uppercase = new RegExp('[A-Z]');
		const lowercase = new RegExp('[a-z]');
		const special = new RegExp(/[!#$%&\‘\(\)\*?@\[\]^_\+\.`\{\|\}~]/);

		if (!number.test(password)) {
			return { password: true };
		}

		if (!uppercase.test(password)) {
			return { password: true };
		}

		if (!lowercase.test(password)) {
			return { password: true };
		}

		if (!special.test(password)) {
			return { password: true };
		}

		if (password.length < 8) {
			return { password: true };
		}

		return null;
	}
}
