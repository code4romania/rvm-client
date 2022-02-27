import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResourcesComponent } from './resources.component';

describe('ResourcesComponent', () => {
	let component: ResourcesComponent;
	let fixture: ComponentFixture<ResourcesComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ ResourcesComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ResourcesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
