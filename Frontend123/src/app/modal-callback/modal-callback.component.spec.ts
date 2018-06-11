import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCallbackComponent } from './modal-callback.component';

describe('ModalCallbackComponent', () => {
  let component: ModalCallbackComponent;
  let fixture: ComponentFixture<ModalCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
