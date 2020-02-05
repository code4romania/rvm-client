import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcedetailsComponent } from './resource-details.component';

describe('ResourcedetailsComponent', () => {
	let component: ResourcedetailsComponent;
	let fixture: ComponentFixture<ResourcedetailsComponent>;

	beforeEach(async(() => {
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
