import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
		providedIn: 'root'
	})
export class ResourcesService {
	constructor(private httpClient: HttpClient) {}

	pager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 15,
		total: 0,
		filters: {}
	};

	getPager() {
		return {...this.pager};
	}

	/**
	 * get all Resources
	 */
	getResources(paginationObj?: any): Observable<any> {
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

		return this.httpClient.get('/resources', { params: params });
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
	deleteResource(id: any) {
		return this.httpClient.delete(`/resources/${id}`);
	}
	getorganisationbyResources(id: String): Observable<any> {

		let params = {};
		params = {...params, ...{name: id}};
		return this.httpClient.get('/resources/organisations', {params: params} );
	}
	editResource(id: string, payload: any) {
		return this.httpClient.put(`/organisations/${id}`, payload );
	}
}
