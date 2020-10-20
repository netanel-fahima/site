import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LostPasswordComponent} from "./login/lost-password/lost-password.component";
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {ProductDetailsComponent} from "./product/product-details/product-details.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'login', pathMatch: 'full', component: LoginComponent},
      {path: 'lost-password', pathMatch: 'full', component: LostPasswordComponent},
      {path: 'shopping-cart', pathMatch: 'full', component: CartComponent},
      {path: 'checkout', pathMatch: 'full', component: CheckoutComponent},
      {
        path: 'product-details', pathMatch: 'full', component: ProductDetailsComponent,
        data: {
          breadcrumbs: ['בית', 'פריטים', 'תאור מוצר']
        }
      },
    ])
  ]
})
export class FeaturesModule {
}
