import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderMobileComponent } from './page-header-mobile.component';

describe('PageHeaderMobileComponent', () => {
  let component: PageHeaderMobileComponent;
  let fixture: ComponentFixture<PageHeaderMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHeaderMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
