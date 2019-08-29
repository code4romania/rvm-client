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
			const number = new RegExp('\\d');
			const uppercase = new RegExp('[A-Z]');
			const lowercase = new RegExp('[a-z]');
			const special = new RegExp(/[!#$%&\‘\(\)\*?@\[\]^_\+\.`\{\|\}~]/);

			if (!number.test(password)) {
				return { password: 'Parolele trebuie să aibă cel puțin 8 caracteer și să conțină o literă mare, un număr și un caracter special.' };
			}

			if (!uppercase.test(password)) {
				return { password: 'Parolele trebuie să aibă cel puțin 8 caracteer și să conțină o literă mare, un număr și un caracter special.' };
			}

			if (!lowercase.test(password)) {
				return { password: 'Parolele trebuie să aibă cel puțin 8 caracteer și să conțină o literă mare, un număr și un caracter special.' };
			}

			if (!special.test(password)) {
				return { password: 'Parolele trebuie să aibă cel puțin 8 caracteer și să conțină o literă mare, un număr și un caracter special.' };
			}

			return null;
		}
	}
}
