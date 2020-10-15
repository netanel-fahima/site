import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderStickyMobileComponent } from './page-header-sticky-mobile.component';

describe('PageHeaderStickyMobileComponent', () => {
  let component: PageHeaderStickyMobileComponent;
  let fixture: ComponentFixture<PageHeaderStickyMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHeaderStickyMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderStickyMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
