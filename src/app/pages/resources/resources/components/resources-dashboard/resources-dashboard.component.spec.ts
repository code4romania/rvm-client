import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResourcesdashboardComponent } from './resources-dashboard.component';

describe('ResourcesdashboardComponent', () => {
	let component: ResourcesdashboardComponent;
	let fixture: ComponentFixture<ResourcesdashboardComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ ResourcesdashboardComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ResourcesdashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
