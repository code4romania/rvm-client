import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FiltersService {
	constructor(private http: HttpClient) {}

	getCategoryFilters(): Observable<any> {
		let params = {};
		params = {...params, ...{name: name}};
		return this.http.get('/resources/categories');
	}
	getorganisationbyName(name?: String): Observable<any> {
		let params = {};
		params = {...params, ...{name: name}};
		return this.http.get('/filter/organisations'/*, {params: params}*/ );
	}
	getSpecializationFilters(name?: String): Observable<any> {
		let params = {};
		params = {...params, ...{name: name}};
		return this.http.get('/filter/volunteers/courses'/*, {params: params}*/ );
	}
	getInstitutionFilters(name?: String): Observable<any> {
		let params = {};
		params = {...params, ...{name: name}};
		return this.http.get('/filter/users/institutions'/*, {params: params}*/);
	}
}
