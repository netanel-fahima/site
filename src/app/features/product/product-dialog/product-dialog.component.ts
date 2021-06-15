import {Component} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {Observable} from 'rxjs/internal/Observable';
import {delay} from 'rxjs/operators';
import {ProductDetails} from '../product-details.service';
import {Subject} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
  public loaded: Subject<boolean>;

  constructor(private spinner: NgxSpinnerService, public product: ProductDetails, private meta: Meta) {
    this.loaded = new Subject<boolean>();
    this.loaded.next(false);
  }


  public open(product: Observable<object>): void {
    this.loaded.next(false);
    this.spinner.show();
    this.product?.sub?.unsubscribe();
    this.product.clear();
    this.product.product =
      this.product.mainProduct = product;



    this.product.product
      .pipe(delay(1000))
      .subscribe(p => {
        this.loaded.next(true);
        this.product.setVariations();
        this.spinner.hide();
        this.meta.addTag({
          name: 'Description',
          content: `Product: ${p.name},Price ₪${p.price},Tags: ${p.tags.join(' ,')},`
        });
      });
  }

  setImges(images): void {
    const imgs = images.map(img => {
      return {src: this.product.getImage(img.name, {height: 1100, width: 700, crop: 'fill'}), h: 1100, w: 700};
    });
    Init.galleryPopup(imgs);
  }

  load(product): void {
    Init.first();
    Init.qtyBtn();
    Init.productZoom(product.images.map(
      (img, index) => {
        return {src: this.product.getImage(img.name, {height: 1100, width: 700, crop: 'fill'})};
      }));
    Init.productGallerySlider();
  }
}
