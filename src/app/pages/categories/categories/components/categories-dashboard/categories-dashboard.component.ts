import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '../../../categories.service';

import { AuthenticationService } from '@app/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
	selector: 'app-categories-dashboard',
	templateUrl: './categories-dashboard.component.html',
	styleUrls: ['./categories-dashboard.component.scss']
})
export class CategoriesDashboardComponent implements OnInit {
	/**
	 * store the categories list
	 */
	categoriesData: Category[] = [];
	/**
	 * pager for the categories table
	 */
	pager: any = {};
	/**
	 * flag for HTML to know how to display data
	 */
	displayBlock = false;
	/**
	 *values to select from when filtering
	 */
	categoryFilterValues: any[] = [];
	locationFilterValues: any[] = [];
	/**
	 * selected filters array
	 */
	selected = new Array(2);
	/**
	 * match the id with _id and display parent_id in order to indent the appropriate subcategories
	 */
	propertyMap = {
		_id: 'id',
		parent_id: 'parent_id'
	};
	/**
	 * navigation extras will be sent to add category if user is ngo.
	 */
	navigationExtras: any;

	constructor(
		private categoryService: CategoriesService,
		public breakpointObserver: BreakpointObserver,
		public authService: AuthenticationService,
		private router: Router
	) {}

	ngOnInit() {
		this.categoryService.setPager();
		this.pager = this.categoryService.getPager();

		this.getData();
		/**
		 * observe screen change and  switch to grid view if screen is too small
		 */
		this.breakpointObserver
			.observe(['(max-width: 768px)'])
			.subscribe(result => {
				if (result.matches) {
					this.switchToBlock();
				}
			});
	}

	/**
	 * get data from server and store locally

	 */
	getData() {
		const slug: string = this.pager.filters['2'];
		this.categoryService.getCategoriesBySlug(slug).subscribe(data => {
			this.categoriesData = data;
			this.pager.total = data.length;
		});
	}

	/**
	 * send user to add category. if is NGO the ngo id is static.
	 */
	addCategory() {
		if (this.authService.is('NGO')) {
			const navigationExtras = {
				state: {
					ngo: {
						// TO-DO: extragere informatiilor din contu utilizatorului
						name: this.authService.user.organisation.name,
						ngoid: this.authService.user.organisation._id
					}
				}
			};
			this.router.navigateByUrl('/categories/add', navigationExtras);
		} else {
			this.router.navigate(['categories/add']);
		}
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
		console.log(this.selected);
		this.pager.filters[id] = this.selected[id]
			.map((elem: any) => elem.id)
			.join(',');
		this.getData();
	}

	/**
	 * view details about category by slug if DSU and by id if NGO
	 * @param {any} res the category to be viewed
	 */
	viewDetails(res: any) {
		if (this.authService.is('DSU')) {
			this.router.navigateByUrl(`/categories/name/${res.slug}`);
		} else {
			this.router.navigateByUrl(
				`/categories/id/${res.categories[0]._id}`
			);
		}
	}

	/**
	 * set flag for HTML to list view
	 */
	switchToList() {
		this.displayBlock = false;
	}

	/**
	 * set flag for HTML to grid view
	 */
	switchToBlock() {
		this.displayBlock = true;
	}
}
