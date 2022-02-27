import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganisationaddComponent } from './organisation-add.component';

describe('OrganisationaddComponent', () => {
	let component: OrganisationaddComponent;
	let fixture: ComponentFixture<OrganisationaddComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [OrganisationaddComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrganisationaddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
