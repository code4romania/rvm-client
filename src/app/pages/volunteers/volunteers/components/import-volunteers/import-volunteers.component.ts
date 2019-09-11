import { Component, OnInit, ViewChild } from '@angular/core';
import { VolunteerService } from '@app/pages/volunteers/volunteers.service';

@Component({
	selector: 'app-import-volunteers',
	templateUrl: './import-volunteers.component.html',
	styleUrls: ['./import-volunteers.component.scss']
})
export class ImportVolunteersComponent implements OnInit {
	@ViewChild('csvReader', { static: true }) csvReader: any;
	public records: any[] = [];
	file: any = null;
	loading = false;

	constructor(private volunteerService: VolunteerService) {}

	ngOnInit() {}

	uploadListener($event: any): void {
		const files = $event.srcElement.files;
		this.loading = true;

		if (this.isValidCSVFile(files[0])) {
			const input = $event.target;
			this.file = input.files[0];
			this.volunteerService.importCsv(this.file).subscribe((response: any) => {
				console.log(response);
				this.loading = false;
			}, error => {
				this.loading = false;
			});
		} else {
			alert('Vă rog introduceți un fișier CSV valid.');
			this.fileReset();
			this.loading = false;
		}
	}

	isValidCSVFile(file: any) {
		return file.name.endsWith('.csv');
	}

	fileReset() {
		this.csvReader.nativeElement.value = '';
		this.records = [];
	}
}
