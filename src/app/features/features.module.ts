import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LostPasswordComponent} from './login/lost-password/lost-password.component';
import {CartComponent} from './cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ProductDetailsComponent} from './product/product-details/product-details.component';
import {AccountComponent} from './account/account.component';
import {ProductComponent} from './product/product.component';
import {ProductDialogComponent} from './product/product-dialog/product-dialog.component';
import {LayoutModule} from '../shared/layout/arts/layout.module';
import {CloudinaryModule} from '@cloudinary/angular-5.x';


@NgModule({
  declarations: [ProductDialogComponent, ProductDetailsComponent],
  exports: [
    ProductDialogComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'login', pathMatch: 'full', component: LoginComponent},
      {path: 'account', pathMatch: 'full', component: AccountComponent},
      {path: 'lost-password', pathMatch: 'full', component: LostPasswordComponent},
      {path: 'shopping-cart', pathMatch: 'full', component: CartComponent},
      {path: 'checkout', pathMatch: 'full', component: CheckoutComponent},
      {
        path: 'product', component: ProductComponent, pathMatch: 'full',
        data: {breadcrumbs: ['Application Intel', 'Introduction']}
      },
      {
        path: 'product-details', pathMatch: 'full', component: ProductDetailsComponent,
        data: {
          breadcrumbs: ['בית', 'פריטים', 'תאור מוצר'],
        }
      },
    ]),
    LayoutModule,
    CloudinaryModule
  ]
})
export class FeaturesModule {
}
