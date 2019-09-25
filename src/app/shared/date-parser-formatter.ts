import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
/**
	 * pad number with zeros
	 */
function padNumber(value: number) {
	if (isNumber(value)) {
		return `0${value}`.slice(-2);
	} else {
		return '';
	}
}
/**
	 * check if is number
	 */
function isNumber(value: any): boolean {
	return !isNaN(toInteger(value));
}
/**
	 * conver to integer
	 */
function toInteger(value: any): number {
	return parseInt(`${value}`, 10);
}

/**
 * Date parser class
 */
@Injectable()
export class DateParserFormatter extends NgbDateParserFormatter {

	/**
	 * Date parser internal variables
	 */
	separator: string;
	ddIndex: number;
	mmIndex: number;
	yyIndex: number;
	anioSumar = 0;
	mask = 'dd.MM.yyyy';

	/**
	 * Date parser set mask value
	 */

	set Mask(value: string) {
		this.mask = value;
	}

	/**
	 * Date parser constructor
	 */
	constructor() {
		super();
		this.separator = this.mask.indexOf('-') >= 0 ? '-' : this.mask.indexOf('.') >= 0 ? '.' : '/';
		const part = this.mask.split(this.separator);
		this.ddIndex = part.indexOf('dd');
		this.mmIndex = part.indexOf('MM');
		this.yyIndex = part.indexOf('yyyy');
		if (this.yyIndex < 0) {
			this.yyIndex = part.indexOf('yy');
			this.anioSumar = 2000;
		}
	}

	/**
	 * Date parser function
	 */
	parse(value: string): NgbDateStruct {
		if (value) {
			value = value.replace(/\.|\/|-/g, this.separator);
			const dateParts = value.trim().split(this.separator);
			if (dateParts.length !== 3) {
				return { year: 0, month: 0, day: 0 };
			}
			let anio = 0;
			let mes = 0;
			let dia = 0;
			const today = new Date();
			if (isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
				// tslint:disable-next-line: max-line-length
				dia = this.ddIndex === 0 ? toInteger(dateParts[0]) : this.ddIndex === 1 ? toInteger(dateParts[1]) : this.ddIndex === 2 ? toInteger(dateParts[2]) : 0;
				// tslint:disable-next-line: max-line-length
				mes = this.mmIndex === 0 ? toInteger(dateParts[0]) : this.mmIndex === 1 ? toInteger(dateParts[1]) : this.mmIndex === 2 ? toInteger(dateParts[2]) : 0;
				anio = this.yyIndex === 0 ? (dateParts[0].length < 2) ? 0 : toInteger(dateParts[0]) + this.anioSumar :
					this.yyIndex === 1 ? (dateParts[1].length < 2) ? 0 : toInteger(dateParts[1]) + this.anioSumar :
						this.yyIndex === 2 ? (dateParts[2].length < 2) ? 0 : toInteger(dateParts[2]) + this.anioSumar : 0;
			}
			if (dia === 0 || mes === 0 || anio === 0) {
				return { year: 0, month: 0, day: 0 };
			}

			if (anio < 100) {
				anio = 2000 + anio;
			}

			return { year: anio, month: mes, day: dia };
		}
		return { year: 0, month: 0, day: 0 };
	}


	/**
	 * Date parser format date
	 */
	format(date: NgbDateStruct): string {
		let stringDate = '';
		if (date) {
			const stringDay = isNumber(date.day) ? padNumber(date.day) : '';
			const stringMonth = isNumber(date.month) ? padNumber(date.month) : '';
			const stringYear = isNumber(date.year) ? (date.year - this.anioSumar).toString() : '';
			// tslint:disable-next-line: max-line-length
			stringDate = (stringDay) ? this.mask.replace('dd', stringDay) : this.ddIndex === 0 ? this.mask.replace('dd' + this.separator, '') : this.mask.replace(this.separator + 'dd', '');
			// tslint:disable-next-line: max-line-length
			stringDate = (stringMonth) ? stringDate.replace('MM', stringMonth) : this.mmIndex === 0 ? stringDate.replace('MM' + this.separator, '') : stringDate.replace(this.separator + 'MM', '');
			if (this.anioSumar) {
				// tslint:disable-next-line: max-line-length
				stringDate = (stringDay) ? stringDate.replace('yy', stringYear) : this.yyIndex === 0 ? stringDate.replace('yy' + this.separator, '') : stringDate.replace(this.separator + 'yy', '');
			} else {
				// tslint:disable-next-line: max-line-length
				stringDate = (stringDay) ? stringDate.replace('yyyy', stringYear) : this.yyIndex === 0 ? stringDate.replace('yyyy' + this.separator, '') : stringDate.replace(this.separator + 'yyyy', '');
			}
		}
		return stringDate;
	}
}
