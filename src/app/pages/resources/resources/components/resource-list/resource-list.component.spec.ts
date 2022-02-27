import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResourceListComponent } from './resource-list.component';

describe('ResourceListComponent', () => {
	let component: ResourceListComponent;
	let fixture: ComponentFixture<ResourceListComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ ResourceListComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ResourceListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
