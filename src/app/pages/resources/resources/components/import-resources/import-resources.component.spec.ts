import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportResourcesComponent } from './import-resources.component';

describe('ImportResourcesComponent', () => {
	let component: ImportResourcesComponent;
	let fixture: ComponentFixture<ImportResourcesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ImportResourcesComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ImportResourcesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
