import {AfterViewChecked, Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {getImageName, getImages} from '../utils/productUtil';
import * as productActions from '../../../core/store/actions';
import {EntityType} from '../../../core/store/actions';
import {Store} from '@ngrx/store';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {EntityService} from '../../../core/store/entity.service';
import {Observable} from 'rxjs/internal/Observable';
import {delay} from 'rxjs/operators';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit, AfterViewChecked, OnDestroy {


  @Input() product: Observable<any>;

  constructor(private store: Store, private cloudinary: Cloudinary, private data: EntityService) {
  }

  ngOnInit(): void {

  }

  public open(): void {
    this.product
      .pipe(delay(100))
      .subscribe(product => {
        Init.first();
        Init.qtyBtn();
        Init.productZoom(product.images.map(
          (img, index) => {
            if (!index) {
              return {src: this.getImage(img.src, {height: 1100, width: 700, crop: 'fill'})};
            }
            return null;
          }));
        // Init.silckDialog();
      });

  }

  ngAfterViewChecked(): void {

  }


  addToWithList(): void {
    this.product.subscribe(product => {
      this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
      Init.offcanvasOpenWishlist();
    });
  }


  getImage(img: any, conf: object = {height: 900, width: 600, crop: 'fill'}): string {
    try {
      const src = this.cloudinary.url(getImageName(img), conf);
      console.log(src);
      return src;
    }
    catch (e) {
      return 'assets/images/product/cart-product-1.jpg';
    }
  }


  @HostListener('unloaded')
  ngOnDestroy(): void {
  }

  addToCart(): void {
    this.product.subscribe(product => {
      this.data.addToCart(product);
    });
  }
}
