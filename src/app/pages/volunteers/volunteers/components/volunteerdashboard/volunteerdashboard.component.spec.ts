import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerdashboardComponent } from './volunteerdashboard.component';

describe('VolunteerdashboardComponent', () => {
  let component: VolunteerdashboardComponent;
  let fixture: ComponentFixture<VolunteerdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
