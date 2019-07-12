import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoaddComponent } from './ngoadd.component';

describe('NgoaddComponent', () => {
	let component: NgoaddComponent;
	let fixture: ComponentFixture<NgoaddComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ NgoaddComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NgoaddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
