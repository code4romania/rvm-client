import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FiltersService {
	constructor(private http: HttpClient) {}

	getCategoryFilters(): Observable<any> {
		return this.http.get('/resources/categories' );
	}
	getSubCategories(id: string, term: string): Observable<any> {
		return this.http.get(`/resources/categories?filters[2]=${id}&filters[1]=${term}`);
	}
	getorganisationbyName(name?: String): Observable<any> {
		let params = {};
		if (name) { params = {...params, ...{name: name}}; }
		return this.http.get('/filter/organisations', {params: params} );
	}
	getSpecializationFilters(name?: String): Observable<any> {
		let params = {};
		if (name) { params = {...params, ...{name: name}}; }
		return this.http.get('/filter/volunteers/courses', {params: params} );
	}
	getInstitutionFilters(name?: String): Observable<any> {
		let params = {};
		if (name) { params = {...params, ...{name: name}}; }
		return this.http.get('/filter/users/institutions', {params: params});
	}
	getAcreditedFilters(name?: String): Observable<any> {
		let params = {};
		if (name) { params = {...params, ...{name: name}}; }
		return this.http.get('/filter/accreditedby', {params: params} );
	}
}
