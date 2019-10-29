import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
		providedIn: 'root'
	})
export class ResourcesService {
	constructor(private httpClient: HttpClient) {}
/**
	 * pager for resources table
	 */
	pager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 15,
		total: 0,
		filters: {}
	};
/**
	 * get the resource pager
	 * @returns pager
	 */
	getPager() {
		return {...this.pager};
	}
	/**
	 * init pager with default values
	 */
	setPager() {
		this.pager = {
			sort: 1,
			method: 'ASC',
			page: 1,
			size: 15,
			total: 0,
			filters: {}
		};
	}

	/**
	 * get all Resources
	 * @param {any} pager with sorting, filters, page etc
	 *  @returns observable with resources list
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
	 * get resource by id
	 * @param {string} id of the resource to be fetched
	 * @param {any} pager with sorting, filters, page etc
	 * @returns observable with response resource
	 */
	getResource(id: String, paginationObj?: any): Observable<any> {
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

		return this.httpClient.get(`/resources/${id}`, { params: params } );
	}
	/**
	 * post a new resource to website, auto add Header
	 * @param {any} payload the org data to be added
	 * @returns observable with response
	 */
	addResource(payload: any) {
		return this.httpClient.post('/resources', payload );
	}
	/**
	 * delete resource by id
	 * @param {string} id of the resource to be deleted
	 * @returns observable with response
	 */
	deleteResource(id: any) {
		return this.httpClient.delete(`/resources/${id}`);
	}
	/**
	 * edit a resource
	 * @param {any} payload the resource data to be modified
	 * @param {string} id of the resource to be modified
	 * @returns observable with response
	 */
	editResource(id: string, payload: any) {
		return this.httpClient.put(`/resources/${id}`, payload );
	}
	/**
	 * send CSV and organisation id to server
	 * @param {string} id of the organisation to be modfified
	 * @param {any} file with CSV data
	 * @returns observable with response resource
	 */
	importCsv(file: any, id: any) {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		formdata.append('organisation_id', id);
		return this.httpClient.post('/resources/import', formdata);
	}
	/**
	 * get resource by slug
	 * @param {string} slug name without diacritics the resource to be fetched
	 * @param {any} pager with sorting, filters, page etc
	 * @returns observable with response resource
	 */
	getResourceBySlug(slug: string, pager: any) {
		let params: any = {};

		params = {...params, ...pager};
		if (params.filters) {
			Object.keys(params.filters).forEach((key) => {
				if (params.filters[key]) {
					params['filters[' + key + ']'] = params.filters[key];
				}
			});
			delete params.filters;
		}
		return this.httpClient.get(`/resources/by_slug/${slug}`, {params: params});
	}

	getTemplate() {
		return this.httpClient.get('/resources/template');
	}
}
