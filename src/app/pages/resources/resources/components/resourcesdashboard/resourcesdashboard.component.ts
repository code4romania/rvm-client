import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ResourcesService } from '../../../resources.service';
import { IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
	selector: 'app-resourcesdashboard',
	templateUrl: './resourcesdashboard.component.html',
	styleUrls: ['./resourcesdashboard.component.scss']
})
export class ResourcesdashboardComponent implements OnInit {
	resourcesData: any[] = [];
	pager: any = {};
	pagerTotal = 0;
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
	ngofilterResult: any = [];
	// Text configuration
	typeTexts: IMultiSelectTexts = {
		checkAll: 'Selectati tot',
		uncheckAll: 'Deselectati Tot',
		checked: 'Selectat',
		checkedPlural: 'Selectate',
		searchPlaceholder: 'Cauta',
		searchEmptyResult: 'Nu sunt rezultate',
		defaultTitle: 'Tip',
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
	NGOTexts: IMultiSelectTexts = {
		checkAll: 'Selectati tot',
		uncheckAll: 'Deselectati Tot',
		checked: 'Selectat',
		checkedPlural: 'Selectate',
		searchPlaceholder: 'Cauta',
		searchEmptyResult: 'Nu sunt rezultate',
		defaultTitle: 'Organizatie',
		allSelected: 'Toate',
	};
	typeFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	NGOFilterValues: any[] = [{id: 1, name: 'test'}, {id: 2, name: 'test1'}];
	LocationFilterValues: any[] = [{id: 'test', name: 'test'}, {id: 'test1', name: 'test1'}];

	constructor(private resourceService: ResourcesService) {

	}
	ngOnInit() {
		this.pager = this.resourceService.getPager();
		this.getData();
	}

	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	filterChanged = (data?: any[], id?: string) => {
		this.pager.filters[id] = data.join(',');
		this.getData();
	}
	getData() {
		this.resourceService.getResources(this.pager).subscribe((data) => {
			this.resourcesData = data.data;
			this.pagerTotal = data.pager.total;
		});
	}
}
