import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganisationsDashboardComponent } from './organisations-dashboard.component';

describe('OrganisationsDashboardComponent', () => {
	let component: OrganisationsDashboardComponent;
	let fixture: ComponentFixture<OrganisationsDashboardComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [OrganisationsDashboardComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrganisationsDashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
