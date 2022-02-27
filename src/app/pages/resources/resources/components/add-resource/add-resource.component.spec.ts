import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddResourceComponent } from './add-resource.component';

describe('AddResourceComponent', () => {
	let component: AddResourceComponent;
	let fixture: ComponentFixture<AddResourceComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ AddResourceComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddResourceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
