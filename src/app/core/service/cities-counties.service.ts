import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class CitiesCountiesService {

	constructor(private http: HttpClient) {}

	getCounties()  {
		return this.http.get('assets/json/counties.json');
	}

	getCitiesbyCounty(name: string) {
		return this.http.get('assets/json/cities.json').pipe(map((data: any) => {
			return data.filter((elem: any) => elem.county === name);
		}));
	}
}
