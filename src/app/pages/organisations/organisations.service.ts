import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { map } from 'rxjs/internal/operators/map';

@Injectable({
		providedIn: 'root'
	})
export class OrganisationService {
	/**
	 * fields for adding a new NGO
	 */
	pager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 20,
		total: 0,
		filters: {}
		// 	'1': 'adapostire',
		// 	'3': 'bihor',
		// 	'5': 'crucea'
		// }
	};
	volunteerPager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 20,
		total: 0,
		filters: {}
		// 	'1': 'adapostire',
		// 	'3': 'bihor',
		// 	'5': 'crucea'
		// }
	};
	resourcePager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 20,
		total: 0,
		filters: {}
		// 	'1': 'adapostire',
		// 	'3': 'bihor',
		// 	'5': 'crucea'
		// }
	};

	getPager() {
		return {...this.pager};
	}

	getVolunteerPager() {
		return {...this.volunteerPager};
	}

	getResourcePager() {
		return {...this.resourcePager};
	}
	/**
	 * fields for adding a new resource
	 */
	constructor(private httpClient: HttpClient) {}
	/**
	 * post a new organisation to website, auto add Header
	 */
	addorganisation(payload: any) {

		return this.httpClient.post('/organisations', payload );
	}
	/**
	 * get all organisations
	 */
	getorganisations(paginationObj?: any): Observable<any> {
		let params: any = {};

		params = {...params, ...paginationObj};
		if (params.filters) {
			Object.keys(params.filters).forEach((key) => {
				if (params.filters[key]) {
					params['filters[' + key + ']'] = params.filters[key];
				}
			});
			delete params.filters;
		}
		return this.httpClient.get('/organisations', { params: params });
	}
	/**
	 * get organisation by id
	 */
	getorganisation(id: String, paginationObj?: any): Observable<any> {
		let params: any = {};
		params = {...params, ...paginationObj};
		return this.httpClient.get(`/organisations/${id}`, {params: params});
	}
	/**
	 * get organisation by name
	 */
	getorganisationbyName(name: String): Observable<any> {
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
	getResourcesbyorganisation(id: String, paginationObj?: any): Observable<any> {
		let params: any = {};

		params = {...params, ...paginationObj};
		if (params.filters) {
			Object.keys(params.filters).forEach((key) => {
				if (params.filters[key]) {
					params['filters[' + key + ']'] = params.filters[key];
				}
			});
			delete params.filters;
		}
		return this.httpClient.get(`/organisations/${id}/resources`, {params: params});
	}
	getVolunteersbyorganisation(id: String, paginationObj?: any): Observable<any> {
		let params: any = {};

		params = {...params, ...paginationObj};
		if (params.filters) {
			Object.keys(params.filters).forEach((key) => {
				if (params.filters[key]) {
					params['filters[' + key + ']'] = params.filters[key];
				}
			});
			delete params.filters;
		}
		return this.httpClient.get(`/organisations/${id}/volunteers`, {params: params});
	}
}
