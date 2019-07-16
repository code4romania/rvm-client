import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LocalStorageService } from '@app/core/local-storage.service';
import { map } from 'rxjs/internal/operators/map';
const credentialsKey = 'credentials';
@Injectable({
		providedIn: 'root'
	})
export class OrganizationService {
	fields = [
		{
			key: 'name',
			label: 'Nume Organizatie',
			required: true,
			value: '',
			size: 'col-md-4',
			controlType: 'textbox'
		},
		{
			key: 'website',
			label: 'Website Organizatie',
			required: true,
			value: '',
			size: 'col-md-5',
			controlType: 'textbox'
		},
		{
			key: 'contact_person',
			label: 'Persoana de contact',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'email',
			label: 'Email',
			type: 'email',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'phone',
			label: 'Numar de Telefon',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'county',
			label: 'Judet',
			options: [
				{key: 'Alba',  value: 'Alba'},
				{key: 'Arad',  value: 'Arad'},
				{key: 'Bacau',   value: 'Bacau'},
				{key: 'Bihor', value: 'Bihor'}
			],
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'dropdown'
		},
		{
			key: 'locality',
			label: 'Oras',
			options: [
				{key: 'AlbaIulia',  value: 'Alba Iulia'},
				{key: 'Arad',  value: 'Arad'},
				{key: 'Bacau',   value: 'Bacau'},
				{key: 'Oradea', value: 'Oradea'}
			],
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'dropdown'
		},
		{
			key: 'address',
			label: 'Adresa',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'Comments',
			label: 'Comentarii',
			value: '',
			size: 'col-md-12 mt-5',
			controlType: 'textarea'
			}
		];
	data = [
		{
			'id': '1',
			'Adresa': 'St. N. Olahus nr.2',
			'Comentarii': '',
			'email': 'contact@habitat.com',
			'judet': 'Bihor',
			'nume': 'Habitat for Humanity',
			'oras': 'Oradea',
			'perscontact': 'fds',
			'telefon': '+40735980076',
			'website': 'dfs'
		},
		{
			'id': '2',
			'Adresa': 'St. N. Olahus nr.2',
			'Comentarii': '',
			'email': 'contact@crucearosie.com',
			'judet': 'Bihor',
			'nume': 'Crucea Rosie',
			'oras': 'Oradea',
			'perscontact': 'fds',
			'telefon': '+40735980076',
			'website': 'dfs'
		},
		{
			'id': '3',
			'Adresa': 'St. N. Olahus nr.2',
			'Comentarii': '',
			'email': 'contact@rise.com',
			'judet': 'Bihor',
			'nume': 'Re:Rise',
			'oras': 'Oradea',
			'perscontact': 'fds',
			'telefon': '+40735980076',
			'website': 'dfs'
		},
		{
			'id': '4',
			'Adresa': 'St. N. Olahus nr.2',
			'Comentarii': '',
			'email': 'contact@magicamp.com',
			'judet': 'Bihor',
			'nume': 'Magicamp',
			'oras': 'Oradea',
			'perscontact': 'fds',
			'telefon': '+40735980076',
			'website': 'dfs'
		}
	];
	private credentials: Authentication.Credentials | null;
	constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService){
		const savedCredentials = this.localStorageService.getItem(credentialsKey);
		if (savedCredentials) {
			this.credentials = JSON.parse(savedCredentials);
		}
	}
	
	get accessToken(): string | null {
		return this.credentials ? this.credentials.token : null;
	}
	getFields() {
		return this.fields;
	}
	addOrganization(payload: any) {
		const header = {
			headers: new HttpHeaders()
			.set('Authorization',  `Bearer ${this.accessToken}`)
		};
		return this.httpClient.post('/organisations', payload, header);
	}
	getOrganizations(): Observable<any> {
		const header = {
			headers: new HttpHeaders()
			.set('Authorization',  `Bearer ${this.accessToken}`)
		};
		return this.httpClient.get('/organisations', header);
	}
	getOrganization(id: String): Observable<any> {
		console.log(id);
		const header = {
			headers: new HttpHeaders()
			.set('Authorization',  `Bearer ${this.accessToken}`)
		};
		return this.httpClient.get(`/organisations/${id}`, header);

		// const returnval: any = this.data.filter(elem => elem.id === id)[0];
		// returnval.status = 'activa';
		// returnval.voluntari = '123';
		// returnval.acoperire = 'nationala';
		// returnval.data = '07/10/2018';
		// return returnval;
	}
}
