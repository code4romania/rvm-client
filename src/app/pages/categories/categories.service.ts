import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import * as lodash from 'lodash';

export interface Category {
	id: string;
	slug: string;
	name: string;
	subCategories: SubCategory[];
}

export interface SubCategory {
	id: string;
	slug: string;
	name: string;
	parentCategory: Category;
}

interface ApiCategory {
	_id: string;
	parent_id: string | undefined;
	slug: string;
	name: string;
}

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {
	constructor(private httpClient: HttpClient) {}

	/**
	 * pager for categories table
	 */
	pager: any = {
		sort: 1,
		method: 'ASC',
		page: 1,
		size: 15,
		total: 0,
		filters: {}
	};

	/**
	 * get the category pager
	 * @returns pager
	 */
	getPager() {
		return { ...this.pager };
	}

	/**
	 * init pager with default values
	 */
	setPager() {
		this.pager = {
			sort: 1,
			method: 'ASC',
			page: 1,
			size: 15,
			total: 0,
			filters: {}
		};
	}

	getCategoriesBySlug(slug?: string): Observable<Category[]> {
		const allCategories$: Observable<Category[]> = this.getAllCategories();
		if (slug && slug !== '') {
			return allCategories$.pipe(
				map((categories: Category[]) =>
					categories.filter((category: Category) =>
						category.slug.toLowerCase().includes(slug.toLowerCase())
					)
				)
			);
		} else {
			return allCategories$;
		}
	}

	getCategoryById(id: string): Observable<Category | undefined> {
		return this.getAllCategories().pipe(
			map((categories: Category[]) => {
				return categories.find(category => category.id === id);
			})
		);
	}

	getAllCategories(): Observable<Category[]> {
		return this.httpClient.get<ApiCategory[]>('/resources/categories').pipe(
			take(1),
			map((apiCategories: ApiCategory[]) =>
				this.groupSubCategoriesOnCategories(apiCategories)
			)
		);
	}

	groupSubCategoriesOnCategories(apiCategories: ApiCategory[]): Category[] {
		const partition: ApiCategory[][] = lodash.partition(
			apiCategories,
			category =>
				category.parent_id === undefined || category.parent_id === '0'
		);
		const parentCategories = partition[0];
		const subCategories = partition[1];

		return parentCategories.map(apiCategory =>
			this.convertToCategory(
				apiCategory,
				subCategories.filter(
					(subCategory: ApiCategory) =>
						subCategory.parent_id === apiCategory._id
				)
			)
		);
	}

	convertToCategory(
		apiCategory: ApiCategory,
		apiSubCategories: ApiCategory[]
	) {
		const category: Category = {
			id: apiCategory._id,
			name: apiCategory.name,
			slug: apiCategory.slug,
			subCategories: apiSubCategories.map((apiSubCategory: ApiCategory) =>
				this.convertToSubCategory(apiSubCategory, category)
			)
		};
		return category;
	}

	convertToSubCategory(
		apiSubCategory: ApiCategory,
		parentCategory: Category
	): SubCategory {
		return {
			id: apiSubCategory._id,
			name: apiSubCategory.name,
			slug: apiSubCategory.slug,
			parentCategory: parentCategory
		};
	}

	getCategory(id: string, paginationObj?: any): Observable<any> {
		let params: any = {};

		params = { ...params, ...paginationObj };
		if (params.filters) {
			Object.keys(params.filters).forEach(key => {
				if (params.filters[key]) {
					params['filters[' + key + ']'] = params.filters[key];
				}
			});
			delete params.filters;
		}

		return this.httpClient.get(`/resources/categories/${id}`, {
			params: params
		});
	}

	/**
	 * post a new category to website, auto add Header
	 * @param {any} payload the org data to be added
	 * @returns observable with response
	 */
	addCategory(payload: any) {
		return this.httpClient.post('/resources/categories', payload);
	}

	/**
	 * delete category by id
	 * @param {string} id of the category to be deleted
	 * @returns observable with response
	 */
	deleteCategory(id: any) {
		return this.httpClient.delete(`/resources/categories/${id}`);
	}

	/**
	 * edit a category
	 * @param {any} payload the category data to be modified
	 * @param {string} id of the category to be modified
	 * @returns observable with response
	 */
	editCategory(id: string, payload: any) {
		return this.httpClient.put(`/resources/categories/${id}`, payload);
	}
}
