import { AbstractControl } from '@angular/forms';

export class WebsiteValidation {
	/**
	* Website validator for reactive forms
	*/
	static websiteValidation(abstractControl: AbstractControl): any {
		const website = abstractControl.value;
		const reg = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i');
		if (reg.test(website)) {
			return null;
		}

		return { 'website': 'Adresa paginii web introdusă nu este validă (ex: www.website.com).' };
	}
}
