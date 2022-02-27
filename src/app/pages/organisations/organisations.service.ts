import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class OrganisationService {
	/**
	 * pagers for the tables in the component
	 */
	pager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 15,
		total: 0,
		filters: {}
	};
	volunteerPager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 20,
		total: 0,
		filters: {}
	};
	resourcePager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 20,
		total: 0,
		filters: {}
	};
	/**
		 * get the standard organisation pager
		 * @returns pager
		 */
	getPager() {
		return { ...this.pager };
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
		 * volunteer pager for ngo details volunteer table
		 */
	getVolunteerPager() {
		return { ...this.volunteerPager };
	}
	/**
		 * resource pager for ngo details resource table
		 */
	getResourcePager() {
		return { ...this.resourcePager };
	}
	/**
	 * fields for adding a new resource
	 */
	constructor(private httpClient: HttpClient) { }

	/**
	 * post a new organisation to website, auto add Header
	 * @param {any} payload the org data to be added
	 * @returns observable with response
	 */
	addorganisation(payload: any) {
		return this.httpClient.post('/organisations', payload);
	}
	/**
		 * edit a new organisation
		 * @param {any} payload the org data to be modified
		 * @param {string} id of the organistation to be modified
		 * @returns observable with response
		 */
	editOrganisation(id: string, payload: any) {

		return this.httpClient.put(`/organisations/${id}`, payload);
	}

	/**
	 * get all organisations
	 * @param {any} pager with sorting, filters, page etc.
	 * @returns observable with organisations list
	 */
	getorganisations(paginationObj?: any): Observable<any> {
		let params: any = {};

		params = { ...params, ...paginationObj };
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
	 * @param {string} id of the organistation to be fetched
	 * @returns observable with response organisation
	 */
	getorganisation(id: String): Observable<any> {
		return this.httpClient.get(`/organisations/${id}`);
	}
	/**
	 * send email to the org to update data
	 * @param {string} id of the organistation to be notified
	 * @returns observable with response
	 */
	sendUpdateDataEmail(id: String): Observable<any> {
		return this.httpClient.get(`/organisations/${id}/email`);
	}
	/**
	 * get organisation by id
	 * @param {string} id of the organistation that has been updated
	 * @returns observable with response
	 */
	updated(id: String): Observable<any> {
		return this.httpClient.get(`/organisations/${id}/validate`);
	}
	/**
	 * delete organisation by id
	 * @param {string} id of the organistation to be deleted
	 * @returns observable with response
	 */
	deleteorganisation(id: String): Observable<any> {
		return this.httpClient.delete(`/organisations/${id}`);
	}
	/**
	 * get organisation by name
	 * @param {string} name of the organistation to be found
	 * @returns observable with response
	 */
	getorganisationbyName(name: String): Observable<any> {
		let params = {};
		params = { ...params, ...{ name: name } };
		return this.httpClient.get('/organisations', { params: params });
	}
	/**
		 * get resource table with ngo id
		 * @param {string} id of the organistation to be queried
		 * @param {any} paginationObj of the resource table
		 * @returns observable with response
		 */
	getResourcesbyorganisation(id: String, paginationObj?: any): Observable<any> {
		let params: any = {};

		params = { ...params, ...paginationObj };
		if (params.filters) {
			Object.keys(params.filters).forEach((key) => {
				if (params.filters[key]) {
					params['filters[' + key + ']'] = params.filters[key];
				}
			});
			delete params.filters;
		}
		return this.httpClient.get(`/organisations/${id}/resources`, { params: params });
	}
	/**
		 * get volunteers table with ngo id
		 * @param {string} id of the organistation to be queried
		 * @param {any} paginationObj of the volunteers table
		 * @returns observable with response
		 */
	getVolunteersbyorganisation(id: String, paginationObj?: any): Observable<any> {
		let params: any = {};

		params = { ...params, ...paginationObj };
		if (params.filters) {
			Object.keys(params.filters).forEach((key) => {
				if (params.filters[key]) {
					params['filters[' + key + ']'] = params.filters[key];
				}
			});
			delete params.filters;
		}
		return this.httpClient.get(`/organisations/${id}/volunteers`, { params: params });
	}
}
