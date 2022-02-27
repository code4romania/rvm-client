import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddVolunteerComponent } from './add-volunteer.component';

describe('AddVolunteerComponent', () => {
	let component: AddVolunteerComponent;
	let fixture: ComponentFixture<AddVolunteerComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [AddVolunteerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddVolunteerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
