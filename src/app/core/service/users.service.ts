import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
/**
	 * User service class
	 */
export class UsersService {
/**
	 * class constructor
	 */
	constructor(private httpClient: HttpClient) {}
	/**
	 *init pager
	 */
	pager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 10,
		total: 0,
		filters: {}
	};
/**
	 * return pager
	 */
	getPager() {
		return {...this.pager};
	}
	/**
	 * post a new User to website, auto add Header
	 */
	addUser(payload: any) {
		return this.httpClient.post('/users', payload );
	}

	/**
	 * get all Users
	 */
	getUsers(paginationObj?: any): Observable<any> {
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
		return this.httpClient.get('/users', { params: params });
	}

	/**
	 * get User by id
	 */
	getUser(id: string, paginationObj?: any): Observable<any> {
		let params: any = {};
		params = {...params, ...paginationObj};
		return this.httpClient.get(`/users/${id}`, {params: params});
	}

	/**
	 * Edit user
	 * @param payload
	 */
	updateUser(payload: any): Observable<any> {
		return this.httpClient.put(`/users/${payload._id}`, payload );
	}

	/**
	 * Delete user by id
	 * @param id
	 */
	deleteUser(id: string): Observable<any> {
		return this.httpClient.delete(`/users/${id}`);
	}

}
