import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ProductComponent} from "./product.component";
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {LayoutModule} from "../../shared/layout/arts/layout.module";
import { ProductPipe } from './pipe/product.pipe';


@NgModule({
  declarations: [ProductDialogComponent, ProductDetailsComponent, ProductPipe],
  exports: [
    ProductDialogComponent,
    ProductPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'product'},
      {
        path: '', component: ProductComponent, pathMatch: 'full',
        data: {breadcrumbs: ['Application Intel', 'Introduction']}
      }
    ]),
    LayoutModule
  ]
})
export class ProductModule {
}
