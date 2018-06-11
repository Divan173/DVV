import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerReserveComponent } from './timepicker-reserve.component';

describe('TimepickerReserveComponent', () => {
  let component: TimepickerReserveComponent;
  let fixture: ComponentFixture<TimepickerReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimepickerReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimepickerReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
