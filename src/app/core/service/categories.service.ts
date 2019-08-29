import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class CategoriesService {
	constructor(private http: HttpClient) {}
	getCategories(term: String): Observable<any> {
		return this.http.get('assets/json/category.json').pipe(map((data: any) => {
			return data.filter((x: any) => {
					return x.name.toLowerCase().indexOf(term) > -1;
				});
			}));
	}
	getSubCategories(id: string, term: string): Observable<any> {
		return this.http.get('assets/json/subcategories.json')
			.pipe(map((data: any) => {
				return data.filter((x: any) => {
					return x.category === id && x.name.toLowerCase().indexOf(term) > -1;
					});
			}));
	}
}
