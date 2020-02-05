import { Component, OnInit, ViewChild } from '@angular/core';
import { VolunteerService } from '@app/pages/volunteers/volunteers.service';
import { FiltersService, AuthenticationService } from '@app/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Component({
	selector: 'app-import-volunteers',
	templateUrl: './import-volunteers.component.html',
	styleUrls: ['./import-volunteers.component.scss']
})
export class ImportVolunteersComponent implements OnInit {
	/**
	 * csv reader input reference
	 */
	@ViewChild('csvReader', { static: true }) csvReader: any;
	/**
	 * the file that will be extracted from file input
	 */
	file: any = null;
	/**
	 * flag for HTML to display loading animation
	 */
	loading = false;
	/**
	 * id of the org to which the resources will be added
	 */
	organisation_id: any = '';
	/**
	 * list of all the NGO from which the DSU can select
	 */
	NGOValues: any[] = [];
	/**
	 * response from server. contains all errors
	 */
	public resp: any = {};

	/**
	 * Csv download tempalte url
	 */
	public templateUrl = environment.serverUrl + '/volunteers/template';

	constructor(private volunteerService: VolunteerService,
		private filterService: FiltersService,
		private router: Router,
		public authService: AuthenticationService) {
			this.resp.has_errors = false;
			if (authService.is('NGO')) {
				this.organisation_id = this.authService.user.organisation._id;
			}
		}

	ngOnInit() {
		this.filterService.getorganisationbyName('').subscribe((data) => {
			this.NGOValues = data;
		});
	}
/**
	 * send file to service and upload to server
	 * @param {any} event contains the file
	 */
	uploadListener($event: any): void {
		const files = $event.srcElement.files;
		this.loading = true;
		if (this.isValidCSVFile(files[0])) {
			const input = $event.target;
			this.file = input.files[0];
			this.volunteerService.importCsv(this.file, this.organisation_id).subscribe((response: any) => {
				this.resp = response;
				if (!this.resp.has_errors) {
					this.loading = false;
					this.router.navigateByUrl('/volunteers');
				} else {
					this.loading = false;
				}
			}, error => {
				this.loading = false;
			});
		} else {
			alert('Vă rog introduceți un fișier CSV valid.');
			this.fileReset();
			this.loading = false;
		}
	}
/**
	 * check if file is ending with csv
	 * @param {any} file that will be uploaded
	 * @returns {boolead}
	 */
	isValidCSVFile(file: any) {
		return file.name.endsWith('.csv');
	}
/**
	 * reset file input and response records
	 * @returns observable with response
	 */
	fileReset() {
		this.csvReader.nativeElement.value = '';
	}
}
