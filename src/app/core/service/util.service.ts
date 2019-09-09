import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
	constructor() {}

	removeEmpty(obj: any): any {
		for (const propName in obj) {
			if (
				obj[propName] === null ||
				obj[propName] === undefined ||
				obj[propName] === '' ||
				(Array.isArray(obj[propName]) && !obj[propName].length)
			) {
				delete obj[propName];
			}
		}
		return obj;
	}
	removeDiacritics(term: string) {
		const diac = ['ă', 'Ă', 'â', 'Â', 'î', 'Î', 'ș', 'Ș', 'ț', 'Ț'];
		const repl = ['a', 'A', 'a', 'A', 'i', 'I', 's', 'S', 't', 'T'];
		for (let i = 0; i < diac.length; i++) {
			const reg = new RegExp(diac[i], 'g');
			term = term.replace(reg, repl[i]);
		}
		return term;
	}

	copyToClipboard(value: string) {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = value;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}
}
