import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResourcedetailsComponent } from './resource-details.component';

describe('ResourcedetailsComponent', () => {
	let component: ResourcedetailsComponent;
	let fixture: ComponentFixture<ResourcedetailsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ ResourcedetailsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ResourcedetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
