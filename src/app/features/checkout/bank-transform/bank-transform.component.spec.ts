import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransformComponent } from './bank-transform.component';

describe('BankTransformComponent', () => {
  let component: BankTransformComponent;
  let fixture: ComponentFixture<BankTransformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankTransformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
