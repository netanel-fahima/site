import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitTransformComponent } from './bit-transform.component';

describe('BitTransformComponent', () => {
  let component: BitTransformComponent;
  let fixture: ComponentFixture<BitTransformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitTransformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
