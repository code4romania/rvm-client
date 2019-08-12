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

@Component({
	selector: 'app-user-dashboard',
	templateUrl: './user-dashboard.component.html',
	styleUrls: ['./user-dashboard.component.scss']
})

export class UserDashboardComponent implements OnInit {
	data: any = [];
	count: String;
	pagination = {};
		// limit: 1,
		// page: 2,
		// order: 'ASC',
		// sort: 'name' };
	displayBlock = true;
	form: FormGroup;

	roles = [
		{
			id: 0,
			name: 'Ofițer de intervenție'
		},
		{
			id: 1,
			name: 'Administratorul instituțional'
		},
		{
			id: 2,
			name: 'Administrator ONG'
		},
		{
			id: 3,
			name: 'Administrator DSU'
		},
	];

	constructor(private usersService: UsersService,
		public breakpointObserver: BreakpointObserver,
		private modalService: NgbModal,
		private router: Router,
		private fb: FormBuilder) { }

	ngOnInit() {
		this.getData();

		this.breakpointObserver.observe([
			'(max-width: 768px)'
				]).subscribe(result => {
				if (result.matches) {
					this.switchtolist();
				}
			});

			this.form = this.fb.group({
				role: ['', Validators.required]
			});
	}

	addUser(content: any) {
		this.modalService.open(content, { centered: true });
	}

	getData() {
		this.usersService.getUsers(this.pagination).subscribe(element => {
			if (element.data) {
				this.data = element.data;
				this.count = `${element.data.length} total`;
			}
		});
	}

	continue() {
		if (this.form.value.role === '2') {
			this.router.navigate(['/organizations/add']);
		} else {
			this.router.navigateByUrl('/users/add/' + this.form.value.role);
		}
		this.modalService.dismissAll();
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
}
