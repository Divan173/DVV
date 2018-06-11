import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHallMapsComponent } from './modal-hall-maps.component';

describe('ModalHallMapsComponent', () => {
  let component: ModalHallMapsComponent;
  let fixture: ComponentFixture<ModalHallMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHallMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHallMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
