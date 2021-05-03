import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {getImageName, getImages} from '../utils/productUtil';
import * as productActions from '../../../core/store/actions';
import {EntityType} from '../../../core/store/actions';
import {Store} from '@ngrx/store';
import {Cloudinary} from '@cloudinary/angular-5.x';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit, AfterViewChecked {

  @Input() product: any;


  constructor(private store: Store, private cloudinary: Cloudinary) {
  }

  ngOnInit(): void {

  }

  loads(): void {
  }

  getImages(str): any[] {
    return getImages(str);
  }

  setImges(str): void {
    const imgs = getImages(str).map(value => {
      return {src: value, w: 700, h: 1100};
    });
    Init.galleryPopup(imgs);
  }

  ngAfterViewChecked(): void {
    if (this.product) {
      Init.first();
      Init.qtyBtn();
      Init.productZoom(getImages(this.product.description));
      Init.productGallerySlider();
    }
  }


  addToCart(product: any): void {
    this.store.dispatch(new productActions.AddVisual(EntityType.Carts, {product, quantity: 1}));
    Init.offcanvasOpen();
  }


  addToWithList(product: any): void {
    this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
    Init.offcanvasOpenWishlist();
  }

  getImageName(image: any) {
    return getImageName(image);
  }

  getImageUrl(image: any) {
    console.log(this.cloudinary.url(getImageName(image), {height: 1024, width: 768, crop: 'fill'}));
    return this.cloudinary.url(getImageName(image), {height: 1024, width: 768, crop: 'fill'});
  }
}
