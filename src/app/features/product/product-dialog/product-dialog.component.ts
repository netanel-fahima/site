import {AfterViewChecked, Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {getImageName, getImages} from '../utils/productUtil';
import * as productActions from '../../../core/store/actions';
import {EntityType} from '../../../core/store/actions';
import {Store} from '@ngrx/store';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {EntityService} from '../../../core/store/entity.service';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit, AfterViewChecked, OnDestroy {


  @Input() product: any;

  constructor(private store: Store, private cloudinary: Cloudinary, private data: EntityService) {
  }

  ngOnInit(): void {

  }

  public open(): void {
  }

  getImages(str): any[] {
    return getImages(str);
  }

  ngAfterViewChecked(): void {
    if (this.product) {
      Init.first();
      Init.qtyBtn();
      Init.productZoom(this.product.images);
      Init.productGallerySlider();
    }
  }



  addToWithList(product: any): void {
    this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
    Init.offcanvasOpenWishlist();
  }

  getImage(img: any): string {
    try {
      const src = this.cloudinary.url(getImageName(img), {height: 1024, width: 768, crop: 'fill'});
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
}
