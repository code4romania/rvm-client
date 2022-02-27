import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganisationsComponent } from './organisations.component';

describe('OrganisationsComponent', () => {
	let component: OrganisationsComponent;
	let fixture: ComponentFixture<OrganisationsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ OrganisationsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrganisationsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
