import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFluidComponent } from './section-fluid.component';

describe('SectionFluidComponent', () => {
  let component: SectionFluidComponent;
  let fixture: ComponentFixture<SectionFluidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionFluidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFluidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
