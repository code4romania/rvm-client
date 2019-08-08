import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../organizations.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
@Component({
	selector: 'app-ngodashboard',
	templateUrl: './ngodashboard.component.html',
	styleUrls: ['./ngodashboard.component.scss']
})
export class NgodashboardComponent implements OnInit {
	Ngosdata: any = [];
	pagerCount: Number;
	displayModel = 'block';
	mySettings: IMultiSelectSettings = {
		enableSearch: true,
		showCheckAll: true,
		showUncheckAll: true,
		fixedTitle: false,
		checkedStyle: 'fontawesome',
		buttonClasses: 'btn btn-link',
		displayAllSelectedText: true
	};
	typefilterResult: any = [];
	locationfilterResult: any = [];
	specializationfilterResult: any = [];
	// Text configuration
	typeTexts: IMultiSelectTexts = {
		checkAll: 'Selectati tot',
		uncheckAll: 'Deselectati Tot',
		checked: 'Selectat',
		checkedPlural: 'Selectate',
		searchPlaceholder: 'Cauta',
		searchEmptyResult: 'Nu sunt rezultate',
		defaultTitle: 'Tipuri resurse',
		allSelected: 'Toate tipurile',
	};
	locationTexts: IMultiSelectTexts = {
		checkAll: 'Selectati tot',
		uncheckAll: 'Deselectati Tot',
		checked: 'Selectat',
		checkedPlural: 'Selectate',
		searchPlaceholder: 'Cauta',
		searchEmptyResult: 'Nu sunt rezultate',
		defaultTitle: 'Locatie',
		allSelected: 'Toate locatiile',
	};
	specializationTexts: IMultiSelectTexts = {
		checkAll: 'Selectati tot',
		uncheckAll: 'Deselectati Tot',
		checked: 'Selectat',
		checkedPlural: 'Selectate',
		searchPlaceholder: 'Cauta',
		searchEmptyResult: 'Nu sunt rezultate',
		defaultTitle: 'Specializarile Voluntarilor',
		allSelected: 'Toate Specializarie',
	};
	typeFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	specializationFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	LocationFilterValues: any[] = [{id: 'test', name: 'test'}, {id: 'test1', name: 'test1'}];
	constructor(
		private organizationService: OrganizationService,
		public breakpointObserver: BreakpointObserver
	) {}
	/**
	 * subscribe to screen size in order to use list instead of grid for display
	 */
	ngOnInit() {
		this.organizationService.getOrganizations().subscribe(element => {
			this.Ngosdata = element;
				// this.Ngosdata = element.data;
				// this.pagerCount = element.pager.total;
		});
		this.breakpointObserver
			.observe(['(max-width: 768px)'])
			.subscribe(result => {
				if (result.matches) {
					this.displayModel = 'list';
					this.switchtolist();
				}
				// } else {
				//   // if necessary:
				//   doSomethingElse();
				// }
			});
	}
	/**
	 * set class of display element with list view
	 */
	switchtolist() {
		this.displayModel = 'list';
	}
	/**
	 * set class of display element with grid view
	 */
	switchtoblock() {
		this.displayModel = 'block';
	}
}
