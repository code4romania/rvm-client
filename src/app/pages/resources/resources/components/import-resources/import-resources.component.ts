import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';

@Component({
	selector: 'app-import-resources',
	templateUrl: './import-resources.component.html',
	styleUrls: ['./import-resources.component.scss']
})
export class ImportResourcesComponent implements OnInit {
	@ViewChild('csvReader', { static: true }) csvReader: any;
	public records: any[] = [];
	file: any = null;
	loading = false;

	constructor(private resourceService: ResourcesService) {}

	ngOnInit() {}

	uploadListener($event: any): void {
		const files = $event.srcElement.files;
		this.loading = true;

		if (this.isValidCSVFile(files[0])) {
			const input = $event.target;
			this.file = input.files[0];
			this.resourceService.importCsv(this.file).subscribe((response: any) => {
				console.log(response);
				this.loading = false;
			}, error => {
				this.loading = false;
			});
		} else {
			alert('Vă rog introduceți un fișier CSV valid.');
			this.fileReset();
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
