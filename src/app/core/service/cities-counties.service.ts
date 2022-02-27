import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CitiesCountiesService {

	constructor(private http: HttpClient) { }
	/**
	* get counties in Romania (filters[1]) and optionaly filter by name (filters[2])
	* @param {string} searchterm The term to filter by
	* @returns an observable containing the counties object list
	*/
	getCounties(searchterm?: string): Observable<any> {
		return this.http.get(`/counties?filters[1]=country_romania_1&filters[2]=${searchterm ? searchterm : ''}`);
	}
	/**
	* get cities in specific county (filters[1]) and optionaly filter by name (filters[2])
	* @param {string} searchterm id of the county from which to search the cities
	* @param {string} searchterm The term to filter by
	* @returns an observable containing the cities object list
	*/
	getCitiesbyCounty(county_id: string, searchterm: string): Observable<any> {
		return this.http.get(`/cities?filters[1]=${county_id}&filters[2]=${searchterm ? searchterm : ''}`);
	}
}
