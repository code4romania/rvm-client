import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { Location } from '@angular/common';
import { CategoriesService, Category } from '../../../categories.service';

@Component({
	selector: 'app-category-details',
	templateUrl: './category-details.component.html',
	styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
	/**
	 * store category
	 */
	public category: Category;
	/**
	 * flag for HTML to display edit button
	 */
	canEdit = true;
	/**
	 * flag for HTML to display loading animation
	 */
	loading = false;

	constructor(
		private categoriesService: CategoriesService,
		private route: ActivatedRoute,
		public authService: AuthenticationService,
		private router: Router,
		private location: Location
	) {}

	ngOnInit() {
		this.getData();
	}

	/**
	 * edit this resource
	 */
	edit() {
		this.router.navigateByUrl(`/categories/edit/${this.category.id}`);
	}

	/**
	 * delete this resource
	 */
	deleteSelf() {
		if (
			confirm(
				'Sunteți sigur că doriți să ștergeți această intrare? Odată ștearsă nu va mai putea fi recuperată.'
			)
		) {
			this.loading = true;
			this.categoriesService.deleteCategory(this.category.id).subscribe(
				() => {
					this.loading = false;
					this.location.back();
				},
				() => {
					this.loading = false;
				}
			);
		}
	}

	/**
	 * get resource data from server
	 */

	getData() {
		this.categoriesService
			.getCategoryById(this.route.snapshot.paramMap.get('id'))
			.subscribe(category => {
				this.category = category;
				this.canEdit = this.authService.is('DSU');
			});
	}
}
