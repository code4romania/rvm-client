import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVolunteerComponent } from './edit-volunteer.component';

describe('EditVolunteerComponent', () => {
	let component: EditVolunteerComponent;
	let fixture: ComponentFixture<EditVolunteerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EditVolunteerComponent ]
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
