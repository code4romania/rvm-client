import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FiltersService {
	constructor(private http: HttpClient) { }
	/**
	* get resource categories
	* @returns an observable containing the categories object list
	*/
	getCategoryFilters(): Observable<any> {
		return this.http.get('/resources/categories');
	}
	/**
	* get subcategories of a category (filters[2]) and optionaly filter by name (filters[1])
	* @param {string} searchterm The term to filter by
	* @param {string} id of the category
	* @returns an observable containing the categories with parent id = id of category
	*/
	getSubCategories(id: string, term: string): Observable<any> {
		return this.http.get(`/resources/categories?filters[2]=${id}&filters[1]=${term}`);
	}
	/**
	* get all organisations in system, but only name and id. Optional filter by name
	* @param {string} searchterm The term to filter by
	* @returns an observable containing the organisations
	*/
	getorganisationbyName(name?: String): Observable<any> {
		let params = {};
		if (name) { params = { ...params, ...{ name: name } }; }
		return this.http.get('/filter/organisations', { params: params });
	}
	/**
	* get all courses in system, but only name and id. Optional filter by name
	* @param {string} searchterm The term to filter by
	* @returns an observable containing the courses
	*/
	getSpecializationFilters(name?: String): Observable<any> {
		let params = {};
		if (name) { params = { ...params, ...{ name: name } }; }
		return this.http.get('/filter/volunteers/courses', { params: params });
	}
	/**
	* get all institutions in system, but only name and id. Optional filter by name
	* @param {string} searchterm The term to filter by
	* @returns an observable containing the institutions
	*/
	getInstitutionFilters(name?: String): Observable<any> {
		let params = {};
		if (name) { params = { ...params, ...{ name: name } }; }
		return this.http.get('/filter/users/institutions', { params: params });
	}
	/**
	* get all acreditors in system, but only name and id. Optional filter by name
	* @param {string} searchterm The term to filter by
	* @returns an observable containing the acreditors
	*/
	getAcreditedFilters(name?: String): Observable<any> {
		let params = {};
		if (name) { params = { ...params, ...{ name: name } }; }
		return this.http.get('/filter/accreditedby', { params: params });
	}
}
