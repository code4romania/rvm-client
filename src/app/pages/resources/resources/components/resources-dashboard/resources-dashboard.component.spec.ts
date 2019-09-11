import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesdashboardComponent } from './resources-dashboard.component';

describe('ResourcesdashboardComponent', () => {
	let component: ResourcesdashboardComponent;
	let fixture: ComponentFixture<ResourcesdashboardComponent>;

	beforeEach(async(() => {
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
