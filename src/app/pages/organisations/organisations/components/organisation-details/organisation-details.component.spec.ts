import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgodetailsComponent } from './organisation-details.component';

describe('NgodetailsComponent', () => {
	let component: NgodetailsComponent;
	let fixture: ComponentFixture<NgodetailsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [NgodetailsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NgodetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
