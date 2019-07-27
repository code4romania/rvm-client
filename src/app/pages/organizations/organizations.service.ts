import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { map } from 'rxjs/internal/operators/map';

@Injectable({
		providedIn: 'root'
	})
export class OrganizationService {
	/**
	 * fields for adding a new NGO
	 */
	ngofields = [
		{
			key: 'name',
			label: 'Nume Organizatie',
			required: true,
			value: '',
			size: 'col-md-4',
			controlType: 'textbox'
		},
		{
			key: 'website',
			label: 'Website Organizatie',
			required: true,
			value: '',
			size: 'col-md-5',
			controlType: 'textbox'
		},
		{
			key: 'contact_person',
			label: 'Persoana de contact',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'email',
			label: 'Email',
			type: 'email',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'phone',
			label: 'Numar de Telefon',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'county',
			label: 'Judet',
			options: [
				{key: 'Alba',  value: 'Alba'},
				{key: 'Arad',  value: 'Arad'},
				{key: 'Bacau',   value: 'Bacau'},
				{key: 'Bihor', value: 'Bihor'}
			],
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'dropdown'
		},
		{
			key: 'city',
			label: 'Oras',
			options: [
				{key: 'Alba Iulia',  value: 'Alba Iulia'},
				{key: 'Arad',  value: 'Arad'},
				{key: 'Bacau',   value: 'Bacau'},
				{key: 'Oradea', value: 'Oradea'}
			],
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'dropdown'
		},
		{
			key: 'address',
			label: 'Adresa',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'Comments',
			label: 'Comentarii',
			value: '',
			size: 'col-md-12 mt-5',
			controlType: 'textarea'
			}
		];
	/**
	 * fields for adding a new resource
	 */
	constructor(private httpClient: HttpClient){}
	/**
	 * Return fields for adding a new NGO
	 */
	getngoFields() {
		return this.ngofields;
	}
	/**
	 * post a new organization to website, auto add Header
	 */
	addOrganization(payload: any) {

		return this.httpClient.post('/organisations', payload );
	}
	/**
	 * get all Organizations
	 */
	getOrganizations(): Observable<any> {

		return this.httpClient.get('/organisations' );
	}
	/**
	 * get Organization by id
	 */
	getOrganization(id: String): Observable<any> {
		return this.httpClient.get(`/organisations/${id}` );
	}
	/**
	 * Add resource
	 */
	addResource(payload: any) {
		return this.httpClient.post('/resources', payload );
	}
	//getResourcesbyOrganization(id: String): Observable<any> {
		// const header = {
		// 	headers: new HttpHeaders()
		// 	.set('Authorization',  `Bearer ${this.accessToken}`)
		// };
		// return this.httpClient.get(`/organisations/${id}` );
	//}
}
