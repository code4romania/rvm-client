import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesService } from '@app/pages/resources/resources.service';
import { FiltersService, AuthenticationService } from '@app/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-import-resources',
	templateUrl: './import-resources.component.html',
	styleUrls: ['./import-resources.component.scss']
})
export class ImportResourcesComponent implements OnInit {
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
	constructor(private resourceService: ResourcesService,
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
			this.resourceService.importCsv(this.file, this.organisation_id).subscribe((response: any) => {
				this.resp = response;
				if (!this.resp.has_errors) {
					this.loading = false;
					this.router.navigateByUrl('/resources');
				} else {
					this.loading = false;
				}
			}, error => {
				this.loading = false;
			});
		} else {
			alert('Vă rog introduceți un fișier CSV valid.');
			this.fileReset();
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

	getTemplate() {
		this.resourceService.getTemplate().subscribe(result => {
			console.log(result);
		});
	}
}
