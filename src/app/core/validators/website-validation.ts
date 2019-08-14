import { AbstractControl } from '@angular/forms';

export class WebsiteValidation {
	static websiteValidation(abstractControl: AbstractControl): any {
		const website = abstractControl.value;
		// const reg = new RegExp('^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}');
		const reg = new RegExp('^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\.-_~:/?#[\]@!\$&\',;=.]+$');

		console.log(website);
		console.log(reg.test(website));
		if (reg.test(website)) {
			return null;
		}

		return { 'website': true };
	}
}
