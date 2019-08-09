import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class UsersService {

	constructor(private httpClient: HttpClient) {}

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
		let params = {};
		params = {...params, ...paginationObj};
		return this.httpClient.get('/users', { params: params });
	}

	/**
	 * get User by id
	 */
	getUser(id: string): Observable<any> {
		return this.httpClient.get(`/users/${id}`);
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
