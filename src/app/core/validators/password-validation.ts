import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
	static MatchPassword(abstractControl: AbstractControl): any {
		const password = abstractControl.get('password').value;
		const confirmPassword = abstractControl.get('confirmPassword').value;

		if (password !== confirmPassword) {
			return {
				password: 'Parolele trebuie să corespundă și să conțină minim 8 caractere, o literă mare, un număr și un caracter special.'
			};
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
			return { password: 'Parolele trebuie să corespundă și să conțină minim 8 caractere, o literă mare, un număr și un caracter special.' };
		}

		if (!uppercase.test(password)) {
			return { password: 'Parolele trebuie să corespundă și să conțină minim 8 caractere, o literă mare, un număr și un caracter special.' };
		}

		if (!lowercase.test(password)) {
			return { password: 'Parolele trebuie să corespundă și să conțină minim 8 caractere, o literă mare, un număr și un caracter special.' };
		}

		if (!special.test(password)) {
			return { password: 'Parolele trebuie să corespundă și să conțină minim 8 caractere, o literă mare, un număr și un caracter special.' };
		}

		if (password.length < 8) {
			return { password: 'Parolele trebuie să corespundă și să conțină minim 8 caractere, o literă mare, un număr și un caracter special.' };
		}

		return null;
	}
}
