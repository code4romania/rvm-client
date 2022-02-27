import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditResourceComponent } from './edit-resource.component';

describe('EditResourceComponent', () => {
	let component: EditResourceComponent;
	let fixture: ComponentFixture<EditResourceComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ EditResourceComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditResourceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
