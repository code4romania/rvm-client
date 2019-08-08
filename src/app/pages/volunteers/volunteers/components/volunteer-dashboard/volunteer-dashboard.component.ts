import { Component, OnInit } from '@angular/core';
import { IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { BreakpointObserver } from '@angular/cdk/layout';
import { VolunteerService } from '../../../volunteers.service';

@Component({
	selector: 'app-volunteer-dashboard',
	templateUrl: './volunteer-dashboard.component.html',
	styleUrls: ['./volunteer-dashboard.component.scss']
})
export class VolunteerDashboardComponent implements OnInit {
	volunteersData: any = [];
	count: String;
	pager: any = {};
	filterResult: any = {};
	displayList = true;
	mySettings: IMultiSelectSettings = {
		enableSearch: true,
		showCheckAll: true,
		showUncheckAll: true,
		fixedTitle: false,
		checkedStyle: 'fontawesome',
		buttonClasses: 'btn btn-link',
		displayAllSelectedText: true
	};
	typeTexts: IMultiSelectTexts = {
		checkAll: 'Selectati tot',
		uncheckAll: 'Deselectati Tot',
		checked: 'Selectat',
		checkedPlural: 'Selectate',
		searchPlaceholder: 'Cauta',
		searchEmptyResult: 'Nu sunt rezultate',
		searchNoRenderText: 'Folositi campul de cautare',
		defaultTitle: 'Tip',
		allSelected: 'Toate',
	};
	locationTexts: IMultiSelectTexts = {
		checkAll: 'Selectati tot',
		uncheckAll: 'Deselectati Tot',
		checked: 'Selectat',
		checkedPlural: 'Selectate',
		searchPlaceholder: 'Cauta',
		searchEmptyResult: 'Nu sunt rezultate',
		searchNoRenderText: 'Folositi campul de cautare',
		defaultTitle: 'Locatie',
		allSelected: 'Toate',
	};
	NGOTexts: IMultiSelectTexts = {
		checkAll: 'Selectati tot',
		uncheckAll: 'Deselectati Tot',
		checked: 'Selectat',
		checkedPlural: 'Selectate',
		searchPlaceholder: 'Cauta',
		searchEmptyResult: 'Nu sunt rezultate',
		searchNoRenderText: 'Folositi campul de cautare',
		defaultTitle: 'Organizatie',
		allSelected: 'Toate',
	};
	specializationTexts: IMultiSelectTexts = {
		checkAll: 'Selectati tot',
		uncheckAll: 'Deselectati Tot',
		checked: 'Selectat',
		checkedPlural: 'Selectate',
		searchPlaceholder: 'Cauta',
		searchEmptyResult: 'Nu sunt rezultate',
		searchNoRenderText: 'Folositi campul de cautare',
		defaultTitle: 'Specializare',
		allSelected: 'Toate',
	};
	typefilterResult: any = [];
	locationfilterResult: any = [];
	specializationfilterResult: any = [];
	ngofilterResult: any = [];
	typeFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	NGOFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	LocationFilterValues: any[] = [{id: 'test', name: 'test'}, {id: 'test1', name: 'test1'}];
	specializationFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	constructor(private volunteerService: VolunteerService, public breakpointObserver: BreakpointObserver) { }
	ngOnInit() {
		this.getData();
		/* subscribe to screen size in order to use list instead of grid for display */
		this.breakpointObserver.observe([
			'(max-width: 768px)'
		]).subscribe(result => {
			if (result.matches) {
				this.switchtolist();
			}
		});
	}
	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	onChange() {
		console.log(this.filterResult);
	}
	getData() {
		this.volunteerService.getVolunteers(this.pager).subscribe((element: any) => {
			if (element) {
				this.volunteersData = element;
				this.count = `${element.length} total`;
			}
		});
	}
	/**
	 * set class of display element with list view
	 */
	switchtolist() {
		this.displayList = true;
	}
	/**
	 * set class of display element with grid view
	 */
	switchtoblock() {
		this.displayList = true;
	}

}
