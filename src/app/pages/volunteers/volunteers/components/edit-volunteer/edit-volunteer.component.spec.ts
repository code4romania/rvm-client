import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditVolunteerComponent } from './edit-volunteer.component';

describe('EditVolunteerComponent', () => {
	let component: EditVolunteerComponent;
	let fixture: ComponentFixture<EditVolunteerComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [EditVolunteerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditVolunteerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
