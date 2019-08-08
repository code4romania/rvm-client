import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@app/core/service/users.service';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
	data: any;
	userTypes = ['DSU', 'NGO', 'Rescue Officer'];

	constructor(private route: ActivatedRoute,
		private router: Router,
		private usersService: UsersService) { }

	ngOnInit() {
		// this.usersService.getUser(this.route.snapshot.paramMap.get('id')).subscribe(response => {
		// 	console.log(response);
		// });

		// TEMP
		const id = this.route.snapshot.paramMap.get('id');
		this.usersService.getUsers({}).subscribe(element => {
			if (element.data) {
				this.data = element.data.find((elem: any) => elem._id === id);
			}
		});
	}

	edit() {
		this.router.navigate(['/users/edit/' + this.data._id]);
	}

}
