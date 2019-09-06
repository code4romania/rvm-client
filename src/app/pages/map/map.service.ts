import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
		providedIn: 'root'
	})
export class MapService {
	constructor(private http: HttpClient) {}

	getMapFilters(): Observable<any> {
		return this.http.get('/filter/map');
	}
}
