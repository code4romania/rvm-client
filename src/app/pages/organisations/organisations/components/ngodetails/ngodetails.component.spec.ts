import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgodetailsComponent } from './ngodetails.component';

describe('NgodetailsComponent', () => {
	let component: NgodetailsComponent;
	let fixture: ComponentFixture<NgodetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ NgodetailsComponent ]
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
