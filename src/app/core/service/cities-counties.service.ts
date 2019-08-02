import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class CitiesCountiesService {
	constructor(private http: HttpClient) {}
	getCounties(): string[] {
		// tslint:disable-next-line: max-line-length
		return ['Alba', 'Arad', 'Argeş', 'Bacău', 'Bihor', 'Bistriţa-Năsăud', 'Botoşani',
		'Brăila', 'Braşov', 'Bucureşti', 'Buzău', 'Călăraşi', 'Caraş-Severin',
		'Cluj', 'Constanţa', 'Covasna', 'Dâmboviţa', 'Dolj', 'Galaţi',
		'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomiţa', 'Iaşi',
		'Ilfov', 'Maramureş', 'Mehedinţi', 'Mureş', 'Neamţ', 'Olt',
		'Prahova', 'Sălaj', 'Satu Mare', 'Sibiu', 'Suceava', 'Teleorman',
		'Timiş', 'Tulcea', 'Vâlcea', 'Vaslui', 'Vrancea'];
	}
	getCitiesbyCounty(name: string): Observable<any> {
			// get users from api
			return this.http.get('assets/json/orase.json')
			.pipe(map((data: any) => {
				return data.filter((x: any) => {
					return x.Judet === name;
					});
			}), map(element => element.map( (x: any) => x.Localitate)));
	} 
}
