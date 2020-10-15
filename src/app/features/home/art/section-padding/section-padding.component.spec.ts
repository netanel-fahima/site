import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPaddingComponent } from './section-padding.component';

describe('SectionPaddingComponent', () => {
  let component: SectionPaddingComponent;
  let fixture: ComponentFixture<SectionPaddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionPaddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
