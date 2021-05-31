import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditTransformComponent } from './credit-transform.component';

describe('CreditTransformComponent', () => {
  let component: CreditTransformComponent;
  let fixture: ComponentFixture<CreditTransformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditTransformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
