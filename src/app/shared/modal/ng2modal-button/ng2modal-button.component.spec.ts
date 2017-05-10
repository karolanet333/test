import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2ModalButtonComponent } from './ng2modal-button.component';

describe('Ng2ModalButtonComponent', () => {
  let component: Ng2ModalButtonComponent;
  let fixture: ComponentFixture<Ng2ModalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2ModalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2ModalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
