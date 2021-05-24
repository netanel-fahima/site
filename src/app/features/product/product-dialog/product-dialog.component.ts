import {Component} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {Store} from '@ngrx/store';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {Observable} from 'rxjs/internal/Observable';
import {delay} from 'rxjs/operators';
import {ProductDetails} from '../product-details.service';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {


  constructor(private store: Store, private cloudinary: Cloudinary, public product: ProductDetails) {
  }

  public open(product: Observable<object>): void {

    this.product.product =
      this.product.mainProduct = product;

    this.product.product
      .pipe(delay(100))
      .subscribe(p => {
        Init.first();
        Init.qtyBtn();
        Init.productZoom(p.images.map(
          (img, index) => {
            if (!index) {
              return {src: this.product.getImage(img.name, {height: 1100, width: 700, crop: 'fill'})};
            }
            return null;
          }));
        // Init.silckDialog();
      });
    this.product.setVariations();
  }


}
