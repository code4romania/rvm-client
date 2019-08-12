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
	pager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 20,
		filters: {}
		// 	'1': 'adapostire',
		// 	'3': 'bihor',
		// 	'5': 'crucea'
		// }
	};

	getPager() {
		return {...this.pager};
	}

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
		let params: any = {};

		params = {...params, ...paginationObj};

		Object.keys(params.filters).forEach((key) => {
			if (params.filters[key]) {
				params['filters[' + key + ']'] = params.filters[key];
			}
		});
		delete params.filters;
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
	getResourcesbyOrganization(id: String): Observable<any> {
		return this.httpClient.get(`/organisations/${id}/resources` );
	}
	getVolunteersbyOrganization(id: String): Observable<any> {
		return this.httpClient.get(`/organisations/${id}/volunteers` );
	}
}
