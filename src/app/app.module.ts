import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { ArtComponent } from './features/home/art/art.component';
import { SliderComponent } from './features/home/art/slider/slider.component';
import {LayoutModule} from "./shared/layout/arts/layout.module";
import {HomeModule} from "./features/home/home.module";
import { ProductComponent } from './features/product/product.component';
import { ProductTitleComponent } from './features/product/product-title/product-title.component';
import {ProductModule} from "./features/product/product.module";
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { LoginComponent } from './features/login/login.component';
import { LostPasswordComponent } from './features/login/lost-password/lost-password.component';
import { AccountComponent } from './features/account/account.component';
import { ContactUsComponent } from './features/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtComponent,
    SliderComponent,
    ProductComponent,
    ProductTitleComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    LostPasswordComponent,
    AccountComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HomeModule,
    ProductModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
