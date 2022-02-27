import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportVolunteersComponent } from './import-volunteers.component';

describe('ImportVolunteersComponent', () => {
	let component: ImportVolunteersComponent;
	let fixture: ComponentFixture<ImportVolunteersComponent>;

	beforeEach(waitForAsync(() => {
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
