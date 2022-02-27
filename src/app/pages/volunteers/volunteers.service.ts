import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class VolunteerService {
	/**
	 * pager for the volunteers table
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
		 * get the volunteer pager
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
	constructor(private httpClient: HttpClient) { }
	/**
		 * post a new volunteer to website, auto add Header
		 * @param {any} payload the org data to be added
		 * @returns observable with response
		 */
	addVolunteer(payload: any) {
		return this.httpClient.post('/volunteers', payload);
	}
	/**
	 * get all volunteers
	 * @param {any} pager with sorting, filters, page etc
	 *  @returns observable with volunteers list
	 */
	getVolunteers(paginationObj?: any): Observable<any> {
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
		return this.httpClient.get('/volunteers', { params: params });
	}
	/**
 * get volunteer by id
 * @param {string} id of the volunteer to be fetched
 * @param {any} pager with sorting, filters, page etc
 * @returns observable with response volunteer
 */
	getVolunteer(id: String): Observable<any> {
		return this.httpClient.get(`/volunteers/${id}`);
	}
	/**
	 * edit a volunteer
	 * @param {any} payload the volunteer data to be modified
	 * @param {string} id of the volunteer to be modified
	 * @returns observable with response
	 */
	editVolunteer(id: String, payload: any): Observable<any> {
		return this.httpClient.put(`/volunteers/${id}`, payload);
	}
	/**
	 * delete volunteer by id
	 * @param {string} id of the volunteer to be deleted
	 * @returns observable with response
	 */
	deleteVolunteer(id: String): Observable<any> {
		return this.httpClient.delete(`/volunteers/${id}`);
	}
	/**
		 * send CSV and organisation id to server
		 * @param {string} id of the organisation to be modfified
		 * @param {any} file with CSV data
		 * @returns observable with response
		 */
	importCsv(file: any, id: any) {
		const formdata: FormData = new FormData();
		console.log(id);
		formdata.append('file', file);
		formdata.append('organisation_id', id);
		return this.httpClient.post('/volunteers/import', formdata);
	}
	/**
		 * get alocations for a volunteer
		 * @param {string} volunteerId of the volunteer for whom to get alocations
		 * @returns observable with response alocations
		 */
	getAllocations(volunteerId: string) {
		return this.httpClient.get(`/volunteers/${volunteerId}/allocations`);
	}
}
