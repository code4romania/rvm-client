import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VolunteerDetailsComponent } from './volunteer-details.component';

describe('VolunteerDetailsComponent', () => {
	let component: VolunteerDetailsComponent;
	let fixture: ComponentFixture<VolunteerDetailsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [VolunteerDetailsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VolunteerDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
