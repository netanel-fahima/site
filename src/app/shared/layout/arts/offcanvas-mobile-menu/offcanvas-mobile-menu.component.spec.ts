import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasMobileMenuComponent } from './offcanvas-mobile-menu.component';

describe('OffcanvasMobileMenuComponent', () => {
  let component: OffcanvasMobileMenuComponent;
  let fixture: ComponentFixture<OffcanvasMobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvasMobileMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffcanvasMobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
