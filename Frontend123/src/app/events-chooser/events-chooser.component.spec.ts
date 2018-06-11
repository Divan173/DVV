import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsChooserComponent } from './events-chooser.component';

describe('EventsChooserComponent', () => {
  let component: EventsChooserComponent;
  let fixture: ComponentFixture<EventsChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
