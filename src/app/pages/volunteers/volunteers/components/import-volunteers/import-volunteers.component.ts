import { Component, OnInit, ViewChild } from '@angular/core';
import { VolunteerService } from '@app/pages/volunteers/volunteers.service';
import { FiltersService, AuthenticationService } from '@app/core';

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
	organisation_id: any = '';
	NGOValues: any[] = [];
	constructor(private volunteerService: VolunteerService,
		private filterService: FiltersService,
		public authService: AuthenticationService) {}

	ngOnInit() {
		this.filterService.getorganisationbyName('').subscribe((data) => {
			this.NGOValues = data;
		});
	}

	uploadListener($event: any): void {
		const files = $event.srcElement.files;
		this.loading = true;
		if (this.isValidCSVFile(files[0])) {
			const input = $event.target;
			this.file = input.files[0];
			this.volunteerService.importCsv(this.file, this.organisation_id).subscribe((response: any) => {
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
