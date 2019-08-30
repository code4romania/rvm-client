import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@app/core/service/users.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
	data: any;
	userTypes = [ 'Ofițer de intervenție', 'Administratorul instituțional', 'Administrator ONG', 'Administrator DSU'];

	constructor(private route: ActivatedRoute,
		private router: Router,
		private usersService: UsersService,
		private location: Location) { }

	ngOnInit() {
		this.usersService.getUser(this.route.snapshot.paramMap.get('id')).subscribe(response => {
			this.data = response;
		});
	}

	edit() {
		if (this.data.role === '2') {
			this.router.navigate(['/organisations/edit/' + this.data.organisation._id]);
		} else {
			this.router.navigate(['/users/edit/' + this.data._id]);
		}
	}

	delete() {
		this.usersService.deleteUser(this.data._id).subscribe(response => {
			this.location.back();
		});
	}
}
