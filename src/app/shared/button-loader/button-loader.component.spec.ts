import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonLoaderComponent } from './button-loader.component';

describe('ButtonLoaderComponent', () => {
  let component: ButtonLoaderComponent;
  let fixture: ComponentFixture<ButtonLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonLoaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
