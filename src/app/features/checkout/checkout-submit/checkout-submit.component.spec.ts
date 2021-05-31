import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSubmitComponent } from './checkout-submit.component';

describe('CheckoutSubmitComponent', () => {
  let component: CheckoutSubmitComponent;
  let fixture: ComponentFixture<CheckoutSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
