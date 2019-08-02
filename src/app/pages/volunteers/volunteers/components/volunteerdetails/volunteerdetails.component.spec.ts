import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerdetailsComponent } from './volunteerdetails.component';

describe('VolunteerdetailsComponent', () => {
  let component: VolunteerdetailsComponent;
  let fixture: ComponentFixture<VolunteerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
