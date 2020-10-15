import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleSectionComponent } from './page-title-section.component';

describe('PageTitleSectionComponent', () => {
  let component: PageTitleSectionComponent;
  let fixture: ComponentFixture<PageTitleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTitleSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
