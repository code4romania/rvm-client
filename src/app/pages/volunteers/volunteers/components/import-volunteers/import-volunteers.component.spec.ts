import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportVolunteersComponent } from './import-volunteers.component';

describe('ImportVolunteersComponent', () => {
	let component: ImportVolunteersComponent;
	let fixture: ComponentFixture<ImportVolunteersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ImportVolunteersComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ImportVolunteersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
