import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-import-volunteers',
	templateUrl: './import-volunteers.component.html',
	styleUrls: ['./import-volunteers.component.scss']
})
export class ImportVolunteersComponent implements OnInit {
	@ViewChild('csvReader', { static: true }) csvReader: any;
	public records: any[] = [];
	fileName = '';

	constructor() {}

	ngOnInit() {}

	uploadListener($event: any): void {
		const files = $event.srcElement.files;

		if (this.isValidCSVFile(files[0])) {
			const input = $event.target;
			const reader = new FileReader();
			reader.readAsText(input.files[0]);

			reader.onload = () => {
				const csvData = reader.result;
				const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

				const headersRow = this.getHeaderArray(csvRecordsArray);

				this.records = this.getDataRecordsArrayFromCSVFile(
					csvRecordsArray,
					headersRow.length
				);
				this.fileName = input.files[0].name;
			};

			reader.onerror = function() {
				console.log('error is occured while reading file!');
			};
		} else {
			alert('Vă rog introduceți un fișier CSV valid.');
			this.fileReset();
		}
	}

	getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
		const csvArr = [];

		for (let i = 1; i < csvRecordsArray.length; i++) {
			const curruntRecord = (<string>csvRecordsArray[i]).split(',');
			if (curruntRecord.length === headerLength) {
				const csvRecord: any = {};
				csvRecord.name = curruntRecord[0].trim();
				csvRecord.ssn = curruntRecord[1].trim();
				csvRecord.phone = curruntRecord[2].trim();
				csvRecord.city = curruntRecord[3].trim();
				csvRecord.county = curruntRecord[4].trim();
				csvRecord.organisation = curruntRecord[5].trim();
				csvArr.push(csvRecord);
			}
		}
		return csvArr;
	}

	isValidCSVFile(file: any) {
		return file.name.endsWith('.csv');
	}

	getHeaderArray(csvRecordsArr: any) {
		const headers = (<string>csvRecordsArr[0]).split(',');
		const headerArray = [];
		for (let j = 0; j < headers.length; j++) {
			headerArray.push(headers[j]);
		}
		return headerArray;
	}

	fileReset() {
		this.csvReader.nativeElement.value = '';
		this.records = [];
	}
}
