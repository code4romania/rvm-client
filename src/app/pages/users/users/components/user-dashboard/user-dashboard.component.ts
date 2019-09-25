import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from '@app/core/service/users.service';
import {
	FormGroup,
	Validators,
	FormBuilder
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthenticationService, FiltersService } from '@app/core';

@Component({
	selector: 'app-user-dashboard',
	templateUrl: './user-dashboard.component.html',
	styleUrls: ['./user-dashboard.component.scss']
})

export class UserDashboardComponent implements OnInit {
	/**
	 * var to hold the users
	 */
	data: any[] = [];
	/**
	 * pager for the resources table
	 */
	pager: any = {};
	/**
	 * flag for HTML to know how to display data
	 */
	displayBlock = true;
	/**
	 * form in which to store the role from the modal
	 */
	form: FormGroup;
	roles = [
		{
			id: 0,
			name: 'Ofițer de intervenție'
		},
		{
			id: 1,
			name: 'Administrator instituțional'
		},
		{
			id: 2,
			name: 'Administrator ONG'
		},
		{
			id: 3,
			name: 'Administrator General'
		},
	];
	/**
	 * selected values for the filter
	 */
	selected = Array(1);
	/**
	 * insitution to select from
	 */
	institutionfiltervalues: any[] = [];

	constructor(private usersService: UsersService,
		public breakpointObserver: BreakpointObserver,
		private modalService: NgbModal,
		private filterService: FiltersService,
		private router: Router, public authService: AuthenticationService,
		private fb: FormBuilder) { }

	ngOnInit() {
		this.pager = this.usersService.getPager();
		this.getData();
		this.filterService.getInstitutionFilters().subscribe((data: any) => {
			this.institutionfiltervalues = data.map((elem: any) => {
				return {id: elem._id, name: elem.name};
			});
		});
		this.breakpointObserver.observe([
			'(max-width: 768px)'
				]).subscribe(result => {
				if (result.matches) {
					this.switchtoblock();
				}
			});

			this.form = this.fb.group({
				role: ['', Validators.required]
			});
	}
/**
	 * get role names from local list to display in select
	 * @param {string} id of the role to be found in the roles array
	 */
	getRole(id: string) {
		for (const elem of this.roles) {
			if (elem.id === parseInt(id, 10)) { return elem.name; }
		}
	}
/**
	 * go to add page for rescue officer or open the modal to select type of user
	 */
	addUser(content: any) {
		if (this.authService.is('DSU')) {
			this.modalService.open(content, { centered: true });
		} else {
			this.router.navigateByUrl('/users/add/0');
		}
	}
/**
	 * get data from server and store localy

	 */
	getData() {
		this.usersService.getUsers(this.pager).subscribe(element => {
			if (element.data) {
				this.data = element.data;
				this.pager.total = element.pager.total;
			}
		});
	}
	/**
	 * go to add page and dismiss the modal
	 */
	continue() {
		this.router.navigateByUrl('/users/add/' + this.form.value.role);
		this.modalService.dismissAll();
	}
	/**
	 * sort callback. Filters added to pager and then a request is made
	 * @param {any} pager the pager with the search filer added
	 */
	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	/**
	 * search callback. Filters added to pager and then a request is made
	 * @param {any} pager the pager with the search filer added
	 */
	searchChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
/**
	 * filter callback. Filters added to pager and then a request is made
	 * @param {number} id the index in the pager filters and filters Selected array
	 */
	filterChanged(id?: number) {
		this.pager.filters[id] = this.selected[id].map((elem: any) => elem.id).join(',');
		this.getData();
	}

	/**
	 * set class of display element with list view
	 */
	switchtolist() {
		this.displayBlock = false;
	}
	/**
	 * set class of display element with grid view
	 */
	switchtoblock() {
		this.displayBlock = true;
	}
	/**
	 * navigate to organisation by id
	 * @param {string} id of the NGO to display
	 */
	goToOrganisation(id: string, e: any) {
		e.preventDefault();
		this.router.navigate(['../organisations/id/' + id]);
	}
}
