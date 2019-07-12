import { Injectable } from '@angular/core';

@Injectable({
		providedIn: 'root'
	})
export class OrganizationService {
	fields = [
		{
			key: 'nume',
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
			key: 'perscontact',
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
			key: 'telefon',
			label: 'Numar de Telefon',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'judet',
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
			key: 'oras',
			label: 'Oras',
			options: [
				{key: 'Alba iulia',  value: 'Alba Iulia'},
				{key: 'Arad',  value: 'Arad'},
				{key: 'Bacau',   value: 'Bacau'},
				{key: 'Oradea', value: 'Oradea'}
			],
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'dropdown'
		},
		{
			key: 'Adresa',
			label: 'Adresa',
			required: true,
			value: '',
			size: 'col-md-4 mt-5',
			controlType: 'textbox'
		},
		{
			key: 'Comentarii',
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

	getFields() {
		return this.fields;
	}
	addToData(element: any) {
		this.data.push(element);
	}
	getData() {
		return this.data;
	}
	getOne(id: String) {
		console.log(id);

		const returnval: any = this.data.filter(elem => elem.id === id)[0];
		returnval.status = 'activa';
		returnval.voluntari = '123';
		returnval.acoperire = 'nationala';
		returnval.data = '07/10/2018';
		return returnval;
	}
}
