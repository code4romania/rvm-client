import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class CitiesCountiesService {

	constructor(private http: HttpClient) {}

	getCounties(searchterm?: string): Observable<any>  {
		return this.http.get(`/counties?filters[1]=country_romania_1&filters[2]=${searchterm ? searchterm : ''}`);
	}

	getCitiesbyCounty(county_id: string, searchterm: string):  Observable<any>  {
		return this.http.get(`/cities?filters[1]=${county_id}&filters[2]=${searchterm ? searchterm : ''}`);
	}
}
