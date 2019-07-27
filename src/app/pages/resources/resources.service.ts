import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
		providedIn: 'root'
	})
export class ResourcesService {
	resourcefields = [
		{
			key: 'organisation_id',
			label: 'Nume Resursa',
			required: false,
			value: '',
			size: 'd-none',
			controlType: 'textbox'
		},
		{
			key: 'name',
			label: 'Nume Resursa',
			required: true,
			value: '',
			size: 'col-md-12',
			controlType: 'textbox'
		},
		{
			key: 'type',
			label: 'Tip Resursa',
			required: true,
			value: '',
			size: 'col-md-12',
			controlType: 'textbox'
		},
		{
			key: 'quantity',
			label: 'Nr. bucati',
			required: true,
			value: '',
			size: 'col-md-12',
			controlType: 'textbox'
		},
		{
			key: 'county',
			label: 'Judet',
			options: [
				{key: 'Alba',  value: 'Alba'},
				{key: 'Arad',  value: 'Arad'},
				{key: 'Arges', value: 'Pitesti'},
				{key: 'Bacau',   value: 'Bacau'},
				{key: 'Bihor', value: 'Bihor'}
			],
			value: '',
			size: 'col-md-6',
			controlType: 'dropdown'
		},
		{
			key: 'city',
			label: 'Oras',
			options: [
				{key: 'Alba Iulia',  value: 'Alba Iulia'},
				{key: 'Arad',  value: 'Arad'},
				{key: 'Arges', value: 'Pitesti'},
				{key: 'Bacau',   value: 'Bacau'},
				{key: 'Oradea', value: 'Oradea'}
			],
			value: '',
			size: 'col-md-6',
			controlType: 'dropdown'
		},
];
	constructor(private httpClient: HttpClient) {}
	/**
	 * get all Resources
	 */
	getResources(): Observable<any> {
		return this.httpClient.get('/resources' );
	}
	
	getResourceFields() {
		return this.resourcefields;
	}
	/**
	 * get Resource by id
	 */
	getResource(id: String): Observable<any> {
		return this.httpClient.get(`/resources/${id}` );
	}
	/**
	 * Add resource
	 */
	addResource(payload: any) {
		return this.httpClient.post('/resources', payload );
	}
	// getResourcesbyOrganization(id: String): Observable<any> {
		// const header = {
		// 	headers: new HttpHeaders()
		// 	.set('Authorization',  `Bearer ${this.accessToken}`)
		// };
		// return this.httpClient.get(`/organisations/${id}` );
	// }
}
