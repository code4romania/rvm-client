import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FiltersService {
	constructor(private http: HttpClient) {}

	getTypeFilters(): Observable<any> {
		return this.http.get('/filter/resources/type_name');
	}
	getOrganisationsFilters(): Observable<any> {
		return this.http.get('/filter/organisations/name');
	}
	getSpecializationFilters(): Observable<any> {
		return this.http.get('/filter/specialization/name');
	}
	getVolunteerTypeFilters(): Observable<any> {
		return this.http.get('/filter/job/name');
	}
}
