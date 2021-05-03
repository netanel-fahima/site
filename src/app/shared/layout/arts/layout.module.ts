import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainComponent} from './main/main.component';
import {RouterModule} from '@angular/router';
import {LogoComponent} from './logo/logo.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {PageHeadingComponent} from './page-heading/page-heading.component';
import {PageFooterComponent} from './page-footer/page-footer.component';
import {PageHeaderStickyComponent} from './page-header-sticky/page-header-sticky.component';
import {PageHeaderMobileComponent} from './page-header-mobile/page-header-mobile.component';
import {PageHeaderStickyMobileComponent} from './page-header-sticky-mobile/page-header-sticky-mobile.component';
import {OffcanvasSearchComponent} from './offcanvas-search/offcanvas-search.component';
import {OffcanvasWishlistComponent} from './offcanvas-wishlist/offcanvas-wishlist.component';
import {OffcanvasCartComponent} from './offcanvas-cart/offcanvas-cart.component';
import {OffcanvasMobileMenuComponent} from './offcanvas-mobile-menu/offcanvas-mobile-menu.component';
import {SectionPaddingComponent} from '../../../features/home/art/section-padding/section-padding.component';
import {PageTitleSectionComponent} from './page-title-section/page-title-section.component';
import {ProductPipe} from '../../../core/pipe/product.pipe';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations:
    [MainComponent,
     LogoComponent,
     PageHeaderComponent,
     PageHeadingComponent,
     PageFooterComponent,
     PageHeaderStickyComponent,
     PageHeaderMobileComponent,
     PageHeaderStickyMobileComponent,
     OffcanvasSearchComponent,
     OffcanvasWishlistComponent,
     OffcanvasCartComponent,
     OffcanvasMobileMenuComponent,
     SectionPaddingComponent,
     PageTitleSectionComponent,
     ProductPipe
    ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [MainComponent, SectionPaddingComponent, PageFooterComponent, PageTitleSectionComponent, ProductPipe],
  entryComponents: []
})

export class LayoutModule {
}
