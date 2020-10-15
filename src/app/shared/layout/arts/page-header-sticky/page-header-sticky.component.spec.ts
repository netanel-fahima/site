import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderStickyComponent } from './page-header-sticky.component';

describe('PageHeaderStickyComponent', () => {
  let component: PageHeaderStickyComponent;
  let fixture: ComponentFixture<PageHeaderStickyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHeaderStickyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderStickyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
