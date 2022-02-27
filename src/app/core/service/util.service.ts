import { Injectable } from '@angular/core';

@Injectable()
/**
	* class with general utility methods
	*/
export class UtilService {
	constructor() { }
	/**
	* remove all empty prop in obj sent as param
	* @param {any} obj the object from which to remove
	* @returns the object without empty properties
	*/
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
	/**
	* remove all diacrirics from sting
	* @param {string} term the string with diacritics
	* @returns the string without diacritics
	*/
	removeDiacritics(term: string): string {
		const diac = ['ă', 'Ă', 'â', 'Â', 'î', 'Î', 'ș', 'Ș', 'ț', 'Ț'];
		const repl = ['a', 'A', 'a', 'A', 'i', 'I', 's', 'S', 't', 'T'];
		for (let i = 0; i < diac.length; i++) {
			const reg = new RegExp(diac[i], 'g');
			term = term.replace(reg, repl[i]);
		}
		return term;
	}
	/**
	* copy value to clipboard. Create new textarea and apply copy command
	* @param {string} vale the string to be copied
	*/
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
