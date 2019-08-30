import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class CategoriesService {
	constructor(private http: HttpClient) {}
	getCategories(term: String): Observable<any> {
		return this.http.get(`/resources/categories?filters[1]=${term}`);
	}
	getSubCategories(id: string, term: string): Observable<any> {
		return this.http.get(`/resources/categories?filters[2]=${id}&filters[1]=${term}`);
	}
}
