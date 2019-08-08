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

	/**
	 * fields for adding a new resource
	 */
	constructor(private httpClient: HttpClient) {}
	/**
	 * post a new organization to website, auto add Header
	 */
	addOrganization(payload: any) {

		return this.httpClient.post('/organisations', payload );
	}
	/**
	 * get all Organizations
	 */
	getOrganizations(paginationObj?: any): Observable<any> {
		let params = {};
		params = {...params, ...paginationObj};
		return this.httpClient.get('/organisations', { params: params });
	}
	/**
	 * get Organization by id
	 */
	getOrganization(id: String): Observable<any> {
		return this.httpClient.get(`/organisations/${id}` );
	}
	/**
	 * get Organization by name
	 */
	getOrganizationbyName(name: String): Observable<any> {
		let params = {};
		params = {...params, ...{name: name}};
		return this.httpClient.get('/organisations', {params: params} );
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
