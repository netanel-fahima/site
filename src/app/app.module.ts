import {BrowserModule} from '@angular/platform-browser';
import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ArtComponent} from './features/home/art/art.component';
import {SliderComponent} from './features/home/art/slider/slider.component';
import {LayoutModule} from './shared/layout/arts/layout.module';
import {HomeModule} from './features/home/home.module';
import {ProductComponent} from './features/product/product.component';
import {ProductTitleComponent} from './features/product/product-title/product-title.component';
import {CartComponent} from './features/cart/cart.component';
import {CheckoutComponent} from './features/checkout/checkout.component';
import {LoginComponent} from './features/login/login.component';
import {LostPasswordComponent} from './features/login/lost-password/lost-password.component';
import {AccountComponent} from './features/account/account.component';
import {ContactUsComponent} from './features/contact-us/contact-us.component';
import {CoreModule} from './core/core.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FeaturesModule} from './features/features.module';
import {StoreModule} from '@ngrx/store';
import {EntityService} from './core/store/entity.service';
import {ApiService} from './core/rest/api.service';
import {WooApi} from './core/rest/woo';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from './core/store';
import {ProductEffect} from './core/store/effect';
import {LoginEffect} from './features/login/slice/effect';
import {CloudinaryModule} from '@cloudinary/angular-5.x';

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
    CoreModule,
    HttpClientModule,
    FormsModule,
    HomeModule,
    LayoutModule,
    FeaturesModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([ProductEffect, LoginEffect]),
    ReactiveFormsModule,
    CloudinaryModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'ILS'},
    ApiService,
    EntityService,
    WooApi
  ],
})
export class AppModule {
}
